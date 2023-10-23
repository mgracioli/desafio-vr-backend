import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoController } from 'src/controllers/produto.controller';
import { ProdutoEntity } from 'src/entities/produto.entity';
import { ProdutoService } from 'src/services/produto.service';
import { ResponseService } from 'src/services/response.service';
import { Utils } from 'src/utils/sistema.utils';

@Module({
  imports: [TypeOrmModule.forFeature([ProdutoEntity])],
  controllers: [ProdutoController],
  providers: [ProdutoService, Utils, ResponseService],
})
export class ProdutoModule { }
