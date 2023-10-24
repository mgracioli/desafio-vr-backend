import { Body, Controller, Delete, Get, Param, Post, Res } from '@nestjs/common';
import { ProdutoSchema } from 'src/schemas/produto.schema';
import { eStatusHTTP } from 'src/services/@enums/response.enum';
import { ProdutoService } from 'src/services/produto.service';
import { ResponseService } from 'src/services/response.service';
import { Utils } from 'src/utils/sistema.utils';
import { Response } from 'express';
import { ProdutoLojaService } from 'src/services/produto-loja.service';

@Controller('/produtoloja')
export class ProdutoLojaController {
  constructor(
    private readonly produtoLojaService: ProdutoLojaService,
    private readonly responseService: ResponseService,
    private readonly utils: Utils,
  ) { }

  // @Post()
  // async cadastrarProdutoLoja(@Body() produto: ProdutoSchema, @Res() response: Response): Promise<Response> {
  //   try {
  //     const objRetorno = await this.produtoService.cadastrarProduto(produto);

  //     switch (objRetorno.codigo_status) {
  //       case eStatusHTTP.SUCESSO:
  //         return await this.responseService.OkObjectResult(response, objRetorno);
  //       case eStatusHTTP.ERRO_SERVIDOR:
  //         return await this.responseService.ServerErrorResult(response, objRetorno);
  //     }
  //   } catch (error) {
  //     const objRetorno = this.utils.TratarErros(error);
  //     return await this.responseService.ServerErrorResult(response, objRetorno);
  //   }
  // }

  // @Get(':id')
  // async buscarProdutoLoja(@Param('id') id: string, @Res() response: Response): Promise<Response> {
  //   try {
  //     const objRetorno = await this.produtoLojaService.buscarProdutoLoja(+id);

  //     switch (objRetorno.codigo_status) {
  //       case eStatusHTTP.SUCESSO:
  //         return await this.responseService.OkObjectResult(response, objRetorno);
  //       case eStatusHTTP.NAO_LOCALIZADO:
  //         return await this.responseService.NotFoundResult(response, objRetorno);
  //     }
  //   } catch (error) {
  //     const objRetorno = this.utils.TratarErros(error);
  //     return await this.responseService.ServerErrorResult(response, objRetorno);
  //   }
  // }

  // @Delete(':id')
  // async excluirProduto(@Param('id') id: string, @Res() response: Response): Promise<Response> {
  //   try {
  //     const objRetorno = await this.produtoService.excluirProduto(+id);

  //     switch (objRetorno.codigo_status) {
  //       case eStatusHTTP.SUCESSO:
  //         return await this.responseService.OkObjectResult(response, objRetorno);
  //       case eStatusHTTP.ERRO_SERVIDOR:
  //         return await this.responseService.ServerErrorResult(response, objRetorno);
  //       case eStatusHTTP.NAO_LOCALIZADO:
  //         return await this.responseService.NotFoundResult(response, objRetorno);
  //     }
  //   } catch (error) {
  //     const objRetorno = this.utils.TratarErros(error);
  //     return await this.responseService.ServerErrorResult(response, objRetorno);
  //   }
  // }
}
