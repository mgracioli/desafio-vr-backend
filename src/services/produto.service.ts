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
import { TProdutoCadastro } from './@Types/produto.types';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>,
    @InjectRepository(ProdutoLojaEntity)
    private readonly produtoLojaRepository: Repository<ProdutoLojaEntity>,
    private readonly utils: Utils,
    // private readonly queryRunner: QueryRunner
  ) { }

  async cadastrarProduto(produto: any): Promise<TRetornoObjetoResponse> {
    const arrayErros = [];
    const objProduto = {
      descricao: produto.descricao,
      custo: produto.custo == '' ? null : produto.custo,
      imagem: produto.imagem == '' ? null : produto.imagem,
    };
    const arrayLojaVenda = produto.lojas_preco;

    // try {
    const produtoSalvo = await this.produtoRepository.save(objProduto);

    if (!produtoSalvo.id || !this.utils.ValidarObjeto(produtoSalvo)) {
      arrayErros.push({
        codigo: '0.00',
        descricao: 'Erro ao salvar produto.',
      });

      return this.utils.MontarJsonRetorno(eStatusHTTP.ERRO_SERVIDOR, arrayErros);
    }

    if (arrayLojaVenda.length) {
      for (let i = 0; i < arrayLojaVenda.length; i++) {
        const objProdutoLoja = {
          id_produto: produtoSalvo.id,
          id_loja: arrayLojaVenda[i].id_loja,
          preco_venda: arrayLojaVenda[i].preco_venda,
        };

        await this.produtoLojaRepository.save(objProdutoLoja);
      }
    } else {
      return this.utils.MontarJsonRetorno(eStatusHTTP.NAO_LOCALIZADO, arrayErros);
    }

    return this.utils.MontarJsonRetorno(eStatusHTTP.SUCESSO, produtoSalvo);
    // } catch {
    //   return this.utils.MontarJsonRetorno(eStatusHTTP.ERRO_SERVIDOR, arrayErros);
    // } finally {
    //   //xxxxxxxxxxxxxxxxxxxxx
    // }
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

  async buscarProduto(produtoId: number, req: Request): Promise<TRetornoObjetoResponse> {
    const arrayErros = [];
    let produto =
      req.query.loja && req.query.loja === 'true'
        ? await this.produtoRepository
          .createQueryBuilder('p')
          .select('p.*')
          .addSelect('p.descricao as prod_desc')
          .addSelect('p.custo as prod_custo')
          .addSelect('l.descricao as loja_desc')
          .addSelect('l.id as id_loja')
          .addSelect('pl.preco_venda as preco_venda')
          .leftJoin('produtoloja', 'pl', 'p.id = pl.id_produto')
          .leftJoin('loja', 'l', 'l.id = pl.id_loja')
          .where({ id: produtoId })
          .getRawMany()
        : await this.produtoRepository.findOne({
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

  async excluirProduto(req: Request = null): Promise<TRetornoObjetoResponse> {
    const arrayErros = [];

    if (req.query.id_loja && req.query.id_loja !== 'null') {
      const produtoLojaExcluido = await this.produtoLojaRepository
        .createQueryBuilder('p')
        .delete()
        .where({ id_loja: req.query.id_loja })
        .andWhere({ id_produto: req.query.id_produto })
        .execute();

      if (produtoLojaExcluido.affected < 0) {
        arrayErros.push({
          codigo: '0.00',
          descricao: 'Erro ao excluir produto.',
        });

        return this.utils.MontarJsonRetorno(eStatusHTTP.ERRO_SERVIDOR, arrayErros);
      }
    } else if (req.query.id_produto && req.query.id_produto !== 'null') {
      const produto = await this.buscarProduto(+req.query.id_produto, req);

      if (!(produto.codigo_status === eStatusHTTP.SUCESSO)) {
        return produto;
      }

      const produtoExcluido = await this.produtoRepository.delete(+req.query.id_produto);

      if (produtoExcluido.affected < 0) {
        arrayErros.push({
          codigo: '0.00',
          descricao: 'Erro ao excluir produto.',
        });

        return this.utils.MontarJsonRetorno(eStatusHTTP.ERRO_SERVIDOR, arrayErros);
      }
    } else {
      arrayErros.push({
        codigo: '0.00',
        descricao: 'Erro ao excluir produto.',
      });

      return this.utils.MontarJsonRetorno(eStatusHTTP.ERRO_SERVIDOR, arrayErros);
    }

    return this.utils.MontarJsonRetorno(eStatusHTTP.SUCESSO, null);
  }

  async editarProduto(produto: any): Promise<TRetornoObjetoResponse> {
    const arrayErros = [];
    const objProduto: ProdutoEntity = {
      id: produto.id,
      descricao: produto.descricao ?? '',
      custo: produto.custo,
      imagem: produto.imagem == '' ? null : produto.imagem,
    };
    const arrayLojaVenda = produto.lojas_preco;

    const produtoSalvo = await this.produtoRepository.save(objProduto);

    if (!this.utils.ValidarObjeto(produtoSalvo)) {
      arrayErros.push({
        codigo: '0.00',
        descricao: 'Erro ao editar produto.',
      });

      return this.utils.MontarJsonRetorno(eStatusHTTP.ERRO_SERVIDOR, arrayErros);
    }

    const vinculoLojaExcluido = await this.excluirProdutoLoja(produtoSalvo.id);

    if (vinculoLojaExcluido && arrayLojaVenda.length) {
      for (let i = 0; i < arrayLojaVenda.length; i++) {
        const objProdutoLoja = {
          id_produto: produto.id,
          id_loja: arrayLojaVenda[i].id_loja,
          preco_venda: arrayLojaVenda[i].preco_venda,
        };

        await this.produtoLojaRepository.save(objProdutoLoja);
      }
    } else {
      return this.utils.MontarJsonRetorno(eStatusHTTP.NAO_LOCALIZADO, arrayErros);
    }

    return this.utils.MontarJsonRetorno(eStatusHTTP.SUCESSO, produtoSalvo);
  }

  private async excluirProdutoLoja(produtoId: number) {
    const arrayErros = [];

    const produtoExcluido = await this.produtoLojaRepository.delete({
      id_produto: produtoId,
    });

    if (produtoExcluido.affected < 0) {
      arrayErros.push({
        codigo: '0.00',
        descricao: 'Erro ao excluir vinculo.',
      });

      return false;
    }

    return true;
  }
}