import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LojaEntity } from 'src/entities/loja.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LojaService {
  constructor(
    @InjectRepository(LojaEntity)
    private readonly lojaRepository: Repository<LojaEntity>,
  ) { }

  async buscarLojas(): Promise<{ data: LojaEntity[] }> {
    const lojas = await this.lojaRepository.find();
    return {
      data: lojas,
    };
  }

  async buscarLoja(lojaId: number): Promise<{ data: LojaEntity }> {
    const loja = await this.lojaRepository.findOneBy({ id: lojaId });
    return {
      data: loja,
    };
  }
}
