import { Injectable } from '@nestjs/common';
import { TRetornoObjetoResponse } from './@types/sistema.types';

import { eStatusHTTP } from 'src/services/@enums/response.enum';

@Injectable()
export class Utils {
  /**
   * Método responsável por preparar o objeto de retorno da requisição HHTP
   * @param Acodigo_status - Código do "codigo_status"
   * @param AConteudo - Objeto "dados/mensagens"
   * @returns [Typagem RetornoObjetoResponse] - Objeto de resposta da requisição HTTP
   */
  public MontarJsonRetorno(Acodigo_status: number, AConteudo: object): TRetornoObjetoResponse {
    switch (Acodigo_status) {
      case 200: {
        return {
          status: 'Sucesso',
          codigo_status: Acodigo_status,
          titulo: 'dados',
          conteudo: AConteudo,
        };
      }
      case 2: {
        return {
          status: 'Erro',
          codigo_status: Acodigo_status,
          titulo: 'mensagens',
          conteudo: AConteudo,
        };
      }
      case 204: {
        return {
          status: 'Não localizado',
          codigo_status: Acodigo_status,
          titulo: 'mensagens',
          conteudo: AConteudo,
        };
      }
      case 4: {
        return {
          status: 'Não autorizado',
          codigo_status: Acodigo_status,
          titulo: 'mensagens',
          conteudo: AConteudo,
        };
      }
      case 5: {
        return {
          status: 'Acesso proibido',
          codigo_status: Acodigo_status,
          titulo: 'mensagens',
          conteudo: AConteudo,
        };
      }
      case 6: {
        return {
          status: 'Registro duplicado',
          codigo_status: Acodigo_status,
          titulo: 'mensagens',
          conteudo: AConteudo,
        };
      }
      case 7: {
        return {
          status: 'Requisição inválida',
          codigo_status: Acodigo_status,
          titulo: 'mensagens',
          conteudo: AConteudo,
        };
      }
      case 8: {
        return {
          status: 'Schema não encontrado',
          codigo_status: Acodigo_status,
          titulo: 'mensagens',
          conteudo: AConteudo,
        };
      }
      case 500: {
        return {
          status: 'Erro de servidor',
          codigo_status: Acodigo_status,
          titulo: 'mensagens',
          conteudo: AConteudo,
        };
      }
      default: {
        return {
          status: 'Erro de servidor',
          codigo_status: 500,
          titulo: 'mensagens',
          conteudo: {
            codigo: '500',
            descricao: 'Erro interno de Servidor.',
          },
        };
      }
    }
  }

  public TratarErros(AErro: any | undefined): TRetornoObjetoResponse {
    const arrayErros = [];

    switch (AErro?.code) {
      default: {
        arrayErros.push({
          codigo: '0.00',
          descricao: `Não foi possível processar a solicitação! Erro desconhecido do servidor.`,
        });
        return this.MontarJsonRetorno(eStatusHTTP.ERRO_SERVIDOR, arrayErros);
      }
    }
  }

  /**
   * Método responsável por verificar se o objeto é diferente de undefined e se o mesmo não está vazio.
   * @param AObjeto Objeto JSON p/ ser verificado
   * @returns [boolean] - Objeto está vazio (false) ou com dados (true).
   */
  public ValidarObjeto(AObjeto: object): boolean {
    if (typeof AObjeto === 'object') {
      for (const prop in AObjeto) {
        if (AObjeto.hasOwnProperty(prop)) {
          return true;
        }
      }
    }
    return false;
  }
}
