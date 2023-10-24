import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LojaController } from 'src/controllers/loja.controller';
import { LojaEntity } from 'src/entities/loja.entity';
import { LojaService } from 'src/services/loja.service';
import { ResponseService } from 'src/services/response.service';
import { Utils } from 'src/utils/sistema.utils';

@Module({
  imports: [TypeOrmModule.forFeature([LojaEntity])],
  controllers: [LojaController],
  providers: [LojaService, Utils, ResponseService],
})
export class LojaModule { }
