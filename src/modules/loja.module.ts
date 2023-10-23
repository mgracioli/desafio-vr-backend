import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LojaController } from 'src/controllers/loja.controller';
import { LojaEntity } from 'src/entities/loja.entity';
import { LojaService } from 'src/services/loja.service';

@Module({
  imports: [TypeOrmModule.forFeature([LojaEntity])],
  controllers: [LojaController],
  providers: [LojaService],
})
export class LojaModule { }
