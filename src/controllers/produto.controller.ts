import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, Res } from '@nestjs/common';
import { eStatusHTTP } from 'src/services/@enums/response.enum';
import { ProdutoService } from 'src/services/produto.service';
import { ResponseService } from 'src/services/response.service';
import { Utils } from 'src/utils/sistema.utils';
import { Response, Request } from 'express';

@Controller('/produto')
export class ProdutoController {
  constructor(
    private readonly produtoService: ProdutoService,
    private readonly responseService: ResponseService,
    private readonly utils: Utils,
  ) { }

  @Post()
  async cadastrarProduto(@Body() produto: any, @Res() response: Response): Promise<Response> {
    try {
      const objRetorno = await this.produtoService.cadastrarProduto(produto);

      switch (objRetorno.codigo_status) {
        case eStatusHTTP.SUCESSO:
          return await this.responseService.OkObjectResult(response, objRetorno);
        case eStatusHTTP.NAO_LOCALIZADO:
          return await this.responseService.NotFoundResult(response, objRetorno);
        case eStatusHTTP.ERRO_SERVIDOR:
          return await this.responseService.ServerErrorResult(response, objRetorno);
      }
    } catch (error) {
      const objRetorno = this.utils.TratarErros(error);
      return await this.responseService.ServerErrorResult(response, objRetorno);
    }
  }

  @Put()
  async editarProduto(@Body() produto: any, @Res() response: Response): Promise<Response> {
    try {
      const objRetorno = await this.produtoService.editarProduto(produto);

      switch (objRetorno.codigo_status) {
        case eStatusHTTP.SUCESSO:
          return await this.responseService.OkObjectResult(response, objRetorno);
        case eStatusHTTP.NAO_LOCALIZADO:
          return await this.responseService.NotFoundResult(response, objRetorno);
        case eStatusHTTP.ERRO_SERVIDOR:
          return await this.responseService.ServerErrorResult(response, objRetorno);
      }
    } catch (error) {
      const objRetorno = this.utils.TratarErros(error);
      return await this.responseService.ServerErrorResult(response, objRetorno);
    }
  }

  @Get(':id')
  async buscarProduto(@Param('id') produtoId: string, @Res() response: Response): Promise<Response> {
    try {
      const objRetorno = await this.produtoService.buscarProduto(+produtoId);

      switch (objRetorno.codigo_status) {
        case eStatusHTTP.SUCESSO:
          return await this.responseService.OkObjectResult(response, objRetorno);
        case eStatusHTTP.NAO_LOCALIZADO:
          return await this.responseService.NotFoundResult(response, objRetorno);
        case eStatusHTTP.ERRO_SERVIDOR:
          return await this.responseService.ServerErrorResult(response, objRetorno);
      }
    } catch (error) {
      const objRetorno = this.utils.TratarErros(error);
      return await this.responseService.ServerErrorResult(response, objRetorno);
    }
  }

  @Get('/produtoloja/:id')
  async buscarProdutoLoja(@Param('id') produtoId: string, @Res() response: Response): Promise<Response> {
    try {
      const objRetorno = await this.produtoService.buscarProdutoLoja(+produtoId);

      switch (objRetorno.codigo_status) {
        case eStatusHTTP.SUCESSO:
          return await this.responseService.OkObjectResult(response, objRetorno);
        case eStatusHTTP.NAO_LOCALIZADO:
          return await this.responseService.NotFoundResult(response, objRetorno);
        case eStatusHTTP.ERRO_SERVIDOR:
          return await this.responseService.ServerErrorResult(response, objRetorno);
      }
    } catch (error) {
      const objRetorno = this.utils.TratarErros(error);
      return await this.responseService.ServerErrorResult(response, objRetorno);
    }
  }

  @Get()
  async buscarProdutos(
    @Query('page') page = 1,
    @Query('limit') limit = 100,
    @Query('descricao') descricao = '',
    @Query('custo') custo = '',
    @Query('precoVenda') precoVenda = '',
    @Res() response: Response
  ): Promise<Response> {
    try {
      const objRetorno = await this.produtoService.buscarProdutos({ page, limit, descricao, custo, precoVenda });
      // return objRetorno
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

  @Delete()
  async excluirProduto(@Req() request: Request, @Res() response: Response): Promise<Response> {
    try {
      const objRetorno = await this.produtoService.excluirProduto(request);

      switch (objRetorno.codigo_status) {
        case eStatusHTTP.SUCESSO:
          return await this.responseService.OkObjectResult(response, objRetorno);
        case eStatusHTTP.NAO_LOCALIZADO:
          return await this.responseService.NotFoundResult(response, objRetorno);
        case eStatusHTTP.ERRO_SERVIDOR:
          return await this.responseService.ServerErrorResult(response, objRetorno);
      }
    } catch (error) {
      const objRetorno = this.utils.TratarErros(error);
      return await this.responseService.ServerErrorResult(response, objRetorno);
    }
  }
}
