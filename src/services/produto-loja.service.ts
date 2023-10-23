import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProdutoEntity } from 'src/entities/produto.entity';
import { Repository } from 'typeorm';
import { eStatusHTTP } from './@enums/response.enum';
import { Utils } from 'src/utils/sistema.utils';
import { TRetornoObjetoResponse } from 'src/utils/@types/sistema.types';
import { ProdutoLojaEntity } from 'src/entities/produto-loja.entity';

@Injectable()
export class ProdutoLojaService {
  constructor(
    @InjectRepository(ProdutoLojaEntity)
    private readonly produtoLojaRepository: Repository<ProdutoLojaEntity>,
    private readonly utils: Utils,
  ) { }

  // async cadastrarProdutoLoja(produto: ProdutoEntity): Promise<TRetornoObjetoResponse> {
  //   const arrayErros = [];
  //   const produtoSalvo = await this.produtoLojaRepository.save(produto);

  //   if (!this.utils.ValidarObjeto(produtoSalvo)) {
  //     arrayErros.push({
  //       codigo: '0.00',
  //       descricao: 'Erro ao salvar produto.',
  //     });

  //     return this.utils.MontarJsonRetorno(eStatusHTTP.ERRO_SERVIDOR, arrayErros);
  //   }

  //   return this.utils.MontarJsonRetorno(eStatusHTTP.SUCESSO, produtoSalvo);
  // }

  // async buscarProdutos(): Promise<TRetornoObjetoResponse> {
  //   const produtos = await this.produtoLojaRepository.find();
  //   const arrayErros = [];

  //   if (!this.utils.ValidarObjeto(produtos)) {
  //     arrayErros.push({
  //       codigo: '0.00',
  //       descricao: 'Nenhum produto localizado.',
  //     });

  //     return this.utils.MontarJsonRetorno(eStatusHTTP.NAO_LOCALIZADO, arrayErros);
  //   }

  //   return this.utils.MontarJsonRetorno(eStatusHTTP.SUCESSO, produtos);
  // }

  async buscarProdutoLoja(produtoId: number) {
    const arrayErros = [];

    const produtoLoja = await this.produtoLojaRepository
      .createQueryBuilder('pl')
      .select('pl.*')
      .addSelect('p.descricao as prod_desc')
      .addSelect('p.custo as prod_custo')
      .addSelect('p.imagem as prod_imagem')
      .addSelect('l.descricao as loja_desc')
      .leftJoin('produto', 'p', 'p.id = pl.id_produto')
      .leftJoin('loja', 'l', 'l.id = pl.id_loja')
      .where({ id_produto: produtoId })
      .getRawMany();

    if (!this.utils.ValidarObjeto(produtoLoja)) {
      arrayErros.push({
        codigo: '0.00',
        descricao: 'Produto não localizado.',
      });

      return this.utils.MontarJsonRetorno(eStatusHTTP.NAO_LOCALIZADO, arrayErros);
    }

    return this.utils.MontarJsonRetorno(eStatusHTTP.SUCESSO, produtoLoja);
  }

  // async excluirProdutoLoja(produtoId: number) {
  //   const arrayErros = [];

  //   const produto = await this.buscarProdutoLoja(produtoId);

  //   if (!(produto.codigo_status === eStatusHTTP.SUCESSO)) {
  //     return produto;
  //   }

  //   const produtoExcluido = await this.produtoLojaRepository.delete(produtoId);

  //   if (produtoExcluido.affected < 0) {
  //     arrayErros.push({
  //       codigo: '0.00',
  //       descricao: 'Erro ao excluir produto.',
  //     });

  //     return this.utils.MontarJsonRetorno(eStatusHTTP.ERRO_SERVIDOR, arrayErros);
  //   }

  //   return this.utils.MontarJsonRetorno(eStatusHTTP.SUCESSO, null);
  // }
}
