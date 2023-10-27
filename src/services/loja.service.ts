import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LojaEntity } from 'src/entities/loja.entity';
import { TRetornoObjetoResponse } from 'src/utils/@types/sistema.types';
import { Utils } from 'src/utils/sistema.utils';
import { Repository } from 'typeorm';
import { eStatusHTTP } from './@enums/response.enum';

@Injectable()
export class LojaService {
  constructor(
    @InjectRepository(LojaEntity)
    private readonly lojaRepository: Repository<LojaEntity>,
    private readonly utils: Utils,
  ) { }

  async buscarLojas(): Promise<TRetornoObjetoResponse> {
    const arrayErros = [];
    const lojas = await this.lojaRepository.find();

    if (!this.utils.ValidarObjeto(lojas)) {
      arrayErros.push({
        codigo: '0.00',
        descricao: 'Nenhuma loja localizada.',
      });

      return this.utils.MontarJsonRetorno(eStatusHTTP.NAO_LOCALIZADO, arrayErros);
    }

    return this.utils.MontarJsonRetorno(eStatusHTTP.SUCESSO, lojas);
  }

  async buscarLoja(lojaId: number): Promise<TRetornoObjetoResponse> {
    const arrayErros = [];
    const loja = await this.lojaRepository.findOne({
      where: {
        id: lojaId
      }
    });

    if (!this.utils.ValidarObjeto(loja)) {
      arrayErros.push({
        codigo: '0.00',
        descricao: 'Loja não localizada.',
      });

      return this.utils.MontarJsonRetorno(eStatusHTTP.NAO_LOCALIZADO, arrayErros);
    }

    return this.utils.MontarJsonRetorno(eStatusHTTP.SUCESSO, loja);
  }
}
