import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProdutoEntity } from 'src/entities/produto.entity';
import { ProdutoLojaEntity } from 'src/entities/produto-loja.entity';
import { Repository, getConnection, QueryRunner } from 'typeorm';
import { eStatusHTTP } from './@enums/response.enum';
import { Utils } from 'src/utils/sistema.utils';
import { TRetornoObjetoResponse } from 'src/utils/@types/sistema.types';
import { LojaEntity } from 'src/entities/loja.entity';
import { Request } from 'express';
import dataSource from 'src/database/data-source-cli';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>,
    @InjectRepository(ProdutoLojaEntity)
    private readonly produtoLojarepository: Repository<ProdutoLojaEntity>,
    @InjectRepository(LojaEntity)
    private readonly lojaRepository: Repository<LojaEntity>,
    private readonly utils: Utils,
  ) { }

  async cadastrarProduto(produto: ProdutoEntity): Promise<TRetornoObjetoResponse> {
    const arrayErros = [];

    try {
      const produtoSalvo = await this.produtoRepository.save(produto);

      if (!this.utils.ValidarObjeto(produtoSalvo)) {
        arrayErros.push({
          codigo: '0.00',
          descricao: 'Erro ao salvar produto.',
        });

        return this.utils.MontarJsonRetorno(eStatusHTTP.ERRO_SERVIDOR, arrayErros);
      }

      const lojas = await this.lojaRepository.find()

      if (lojas) {
        for (let i = 0; i < lojas.length; i++) {
          const objProdutoLoja = {
            id_produto: produto.id,
            id_loja: lojas[i].id,
            preco_venda: 0
          }

          await this.produtoLojarepository.save(objProdutoLoja)
        }
      } else {
        return this.utils.MontarJsonRetorno(eStatusHTTP.NAO_LOCALIZADO, arrayErros);
      }

      return this.utils.MontarJsonRetorno(eStatusHTTP.SUCESSO, produtoSalvo);
    } catch {
      return this.utils.MontarJsonRetorno(eStatusHTTP.ERRO_SERVIDOR, arrayErros);
    } finally {
      //xxxxxxxxxxxxxxxxxxxxx
    }
  }

  async buscarProdutos(): Promise<TRetornoObjetoResponse> {
    const arrayErros = [];
    const produtos = await this.produtoRepository.find();

    if (!this.utils.ValidarObjeto(produtos)) {
      arrayErros.push({
        codigo: '0.00',
        descricao: 'Nenhum produto localizado.',
      });

      return this.utils.MontarJsonRetorno(eStatusHTTP.NAO_LOCALIZADO, arrayErros);
    }

    return this.utils.MontarJsonRetorno(eStatusHTTP.SUCESSO, produtos);
  }

  async buscarProduto(produtoId: number, req: Request = null) {
    const arrayErros = [];
    let produto = (req.query.loja === 'true') ?
      await this.produtoRepository
        .createQueryBuilder('p')
        .select('p.*')
        .addSelect('p.descricao as prod_desc')
        .addSelect('p.custo as prod_custo')
        .addSelect('p.imagem as prod_imagem')
        .addSelect('l.descricao as loja_desc')
        .leftJoin('produtoloja', 'pl', 'p.id = pl.id_produto')
        .leftJoin('loja', 'l', 'l.id = pl.id_loja')
        .where({ id: produtoId })
        .getRawMany()
      :
      await this.produtoRepository.findOne({
        where: { id: produtoId },
      });

    if (!this.utils.ValidarObjeto(produto)) {
      arrayErros.push({
        codigo: '0.00',
        descricao: 'Produto não localizado.',
      });

      return this.utils.MontarJsonRetorno(eStatusHTTP.NAO_LOCALIZADO, arrayErros);
    }

    return this.utils.MontarJsonRetorno(eStatusHTTP.SUCESSO, produto);
  }

  async buscarProdutoLoja(produtoId: number) {
    const arrayErros = [];

    const produtoLoja = await this.produtoRepository
      .createQueryBuilder('p')
      .select('p.*')
      .addSelect('p.descricao as prod_desc')
      .addSelect('p.custo as prod_custo')
      .addSelect('p.imagem as prod_imagem')
      .addSelect('l.descricao as loja_desc')
      .leftJoin('produtoloja', 'pl', 'p.id = pl.id_produto')
      .leftJoin('loja', 'l', 'l.id = pl.id_loja')
      .where({ id: produtoId })
      .getRawMany();

    if (!this.utils.ValidarObjeto(produtoLoja)) {

      //procurar so o produto, sem estar vinculado com a loja!!!!

      arrayErros.push({
        codigo: '0.00',
        descricao: 'Produto não localizado.',
      });

      return this.utils.MontarJsonRetorno(eStatusHTTP.NAO_LOCALIZADO, arrayErros);
    }

    return this.utils.MontarJsonRetorno(eStatusHTTP.SUCESSO, produtoLoja);
  }

  async excluirProduto(produtoId: number) {
    const arrayErros = [];

    const produto = await this.buscarProduto(produtoId);

    if (!(produto.codigo_status === eStatusHTTP.SUCESSO)) {
      return produto;
    }

    const produtoExcluido = await this.produtoRepository.delete(produtoId);

    if (produtoExcluido.affected < 0) {
      arrayErros.push({
        codigo: '0.00',
        descricao: 'Erro ao excluir produto.',
      });

      return this.utils.MontarJsonRetorno(eStatusHTTP.ERRO_SERVIDOR, arrayErros);
    }

    return this.utils.MontarJsonRetorno(eStatusHTTP.SUCESSO, null);
  }
}
