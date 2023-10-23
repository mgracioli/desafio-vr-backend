import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoLojaController } from 'src/controllers/produto-loja.controller';
import { ProdutoLojaEntity } from 'src/entities/produto-loja.entity';
import { ProdutoLojaService } from 'src/services/produto-loja.service';
import { ResponseService } from 'src/services/response.service';
import { Utils } from 'src/utils/sistema.utils';

@Module({
  imports: [TypeOrmModule.forFeature([ProdutoLojaEntity])],
  controllers: [ProdutoLojaController],
  providers: [ProdutoLojaService, Utils, ResponseService],
})
export class ProdutoLojaModule { }
