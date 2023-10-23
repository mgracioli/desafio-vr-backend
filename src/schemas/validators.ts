import { Injectable } from "@nestjs/common";

@Injectable()
export class Validators {

  public tamanhoInvalido(tamanhoCorreto: number) {
    return `Tamanho do campo inválido, deve conter, no máximo, ${tamanhoCorreto} digitos`
  }

  public campoNaoPodeSerNullo() {
    return {
      retorno: {
        codigo: '0.00',
        descricao: 'Campo não pode ser nulo'
      }
    }
  }
}