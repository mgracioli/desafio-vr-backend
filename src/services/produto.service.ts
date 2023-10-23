import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProdutoEntity } from 'src/entities/produto.entity';
import { Repository } from 'typeorm';
import { eStatusHTTP } from './@enums/response.enum';
import { Utils } from 'src/utils/sistema.utils';
import { TRetornoObjetoResponse } from 'src/utils/@types/sistema.types';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>,
    private readonly utils: Utils,
  ) { }

  async cadastrarProduto(produto: ProdutoEntity): Promise<TRetornoObjetoResponse> {
    const arrayErros = [];
    const produtoSalvo = await this.produtoRepository.save(produto);

    if (!this.utils.ValidarObjeto(produtoSalvo)) {
      arrayErros.push({
        codigo: '0.00',
        descricao: 'Erro ao salvar produto.',
      });

      return this.utils.MontarJsonRetorno(eStatusHTTP.ERRO_SERVIDOR, arrayErros);
    }

    return this.utils.MontarJsonRetorno(eStatusHTTP.SUCESSO, produtoSalvo);
  }

  async buscarProdutos(): Promise<TRetornoObjetoResponse> {
    const produtos = await this.produtoRepository.find();
    const arrayErros = [];

    if (!this.utils.ValidarObjeto(produtos)) {
      arrayErros.push({
        codigo: '0.00',
        descricao: 'Nenhum produto localizado.',
      });

      return this.utils.MontarJsonRetorno(eStatusHTTP.NAO_LOCALIZADO, arrayErros);
    }

    return this.utils.MontarJsonRetorno(eStatusHTTP.SUCESSO, produtos);
  }

  async buscarProduto(produtoId: number) {
    const arrayErros = [];

    const produto = await this.produtoRepository.findOne({
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
