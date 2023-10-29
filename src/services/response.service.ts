import { HttpStatus } from '@nestjs/common'
import { Response } from 'express';

import { TRetornoObjetoResponse } from "src/utils/@types/sistema.types";

export class ResponseService {
  /**
 * Método responsável por transformar o Object javaScript em JSON.
 * @param status - String pré definido p/ apoio visual ao desenvolvedor
 * @param codigo_status - Number pré definido p/ apoio ao front-end
 * @param titulo - String pré definido p/ apoio visual ao usuario/ desenvolvedor e front-end
 * @param conteudo - Object pré definido p/ envio dos dados ao array respectivo (dados / mensagens)
 * @returns [boolean] - Objeto está vazio (false) ou com dados (true).
 */
  private getObjJSONRetorno({ status, codigo_status, titulo, conteudo }: TRetornoObjetoResponse): object {
    const atributosComuns = {
      status: status,
      codigo_status: codigo_status,
      [titulo]: conteudo,
    };

    const objJSONRetorno = {
      retorno: atributosComuns,
    };

    return objJSONRetorno;
  }

  /**
   * Método responsável por gerar o retorno com status code 200 caso o processamento seja Ok.
   * @param Aresp - Objeto de manipulação de requisição HTTP (req)
   * @param AObjetoRetorno - Objeto de retonro no response HTTP (res)
   * @returns [Response] - Objeto de resposta da requisição HTTP
   */
  public async OkObjectResult(Aresp: Response, AObjetoRetorno: TRetornoObjetoResponse): Promise<Response> {
    return Aresp.status(HttpStatus.OK).json(this.getObjJSONRetorno(AObjetoRetorno));
  }

  /**
  * Método responsável por gerar o retorno com status code 200 caso não encontre o registro solicitado.
  * @param Aresp - Objeto de manipulação de requisição HTTP (req)
  * @param AObjetoRetorno - Objeto de retonro no response HTTP (res)
  * @returns [Response] - Objeto de resposta da requisição HTTP.
  */
  public async NotFoundResult(AResp: Response, AObjetoRetorno: TRetornoObjetoResponse): Promise<Response> {
    return AResp.status(HttpStatus.OK).json(this.getObjJSONRetorno(AObjetoRetorno));
  }

  /**
   * Método responsável por gerar o retorno com status code 500 caso o sistema apresente um erro crípitico.
   * @param Aresp - Objeto de manipulação de requisição HTTP (req)
   * @param AObjetoRetorno - Objeto de retonro no response HTTP (res)
   * @returns [Response] - Objeto de resposta da requisição HTTP.
   */
  public async ServerErrorResult(AResp: Response, AObjetoRetorno: TRetornoObjetoResponse): Promise<Response> {
    return AResp.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.getObjJSONRetorno(AObjetoRetorno));
  }
}
