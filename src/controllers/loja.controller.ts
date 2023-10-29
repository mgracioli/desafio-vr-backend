import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';

import { eStatusHTTP } from 'src/services/@enums/response.enum';
import { LojaService } from 'src/services/loja.service';
import { ResponseService } from 'src/services/response.service';
import { Utils } from 'src/utils/sistema.utils';
@Controller('/loja')
export class LojaController {
  constructor(
    private readonly lojaService: LojaService,
    private readonly responseService: ResponseService,
    private readonly utils: Utils
  ) { }

  @Get()
  async buscarLojas(@Res() response: Response): Promise<Response> {
    try {
      const objRetorno = await this.lojaService.buscarLojas();

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
}
