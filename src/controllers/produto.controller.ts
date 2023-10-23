import { Body, Controller, Delete, Get, Param, Post, Res } from '@nestjs/common';
import { ProdutoSchema } from 'src/schemas/produto.schema';
import { eStatusHTTP } from 'src/services/@enums/response.enum';
import { ProdutoService } from 'src/services/produto.service';
import { ResponseService } from 'src/services/response.service';
import { Utils } from 'src/utils/sistema.utils';
import { Response } from 'express';

@Controller('/produto')
export class ProdutoController {
  constructor(
    private readonly produtoService: ProdutoService,
    private readonly responseService: ResponseService,
    private readonly utils: Utils,
  ) { }

  @Post()
  async cadastrarProduto(@Body() produto: ProdutoSchema, @Res() response: Response): Promise<Response> {
    try {
      const objRetorno = await this.produtoService.cadastrarProduto(produto);

      switch (objRetorno.codigo_status) {
        case eStatusHTTP.SUCESSO:
          return await this.responseService.OkObjectResult(response, objRetorno);
        case eStatusHTTP.ERRO_SERVIDOR:
          return await this.responseService.ServerErrorResult(response, objRetorno);
      }
    } catch (error) {
      const objRetorno = this.utils.TratarErros(error);
      return await this.responseService.ServerErrorResult(response, objRetorno);
    }
  }

  @Get(':id')
  async buscarProduto(@Param('id') id: string, @Res() response: Response): Promise<Response> {
    try {
      const objRetorno = await this.produtoService.buscarProduto(+id);

      switch (objRetorno.codigo_status) {
        case eStatusHTTP.SUCESSO:
          return await this.responseService.OkObjectResult(response, objRetorno);
        case eStatusHTTP.NAO_LOCALIZADO:
          return await this.responseService.NotFoundResult(response, objRetorno);
      }
    } catch (error) {
      const objRetorno = this.utils.TratarErros(error);
      return await this.responseService.ServerErrorResult(response, objRetorno);
    }
  }

  @Get()
  async buscarProdutos(@Res() response: Response): Promise<Response> {
    try {
      const objRetorno = await this.produtoService.buscarProdutos();

      switch (objRetorno.codigo_status) {
        case eStatusHTTP.SUCESSO:
          return await this.responseService.OkObjectResult(response, objRetorno);
        case eStatusHTTP.NAO_LOCALIZADO:
          return await this.responseService.NotFoundResult(response, objRetorno);
      }
    } catch (error) {
      const objRetorno = this.utils.TratarErros(error);
      return await this.responseService.ServerErrorResult(response, objRetorno);
    }
  }

  @Delete(':id')
  async excluirProduto(@Param('id') id: string, @Res() response: Response): Promise<Response> {
    try {
      const objRetorno = await this.produtoService.excluirProduto(+id);

      switch (objRetorno.codigo_status) {
        case eStatusHTTP.SUCESSO:
          return await this.responseService.OkObjectResult(response, objRetorno);
        case eStatusHTTP.ERRO_SERVIDOR:
          return await this.responseService.ServerErrorResult(response, objRetorno);
        case eStatusHTTP.NAO_LOCALIZADO:
          return await this.responseService.NotFoundResult(response, objRetorno);
      }
    } catch (error) {
      const objRetorno = this.utils.TratarErros(error);
      return await this.responseService.ServerErrorResult(response, objRetorno);
    }
  }
}
