import { Module } from '@nestjs/common';
import { LojaController } from 'src/controllers/loja.controller';

@Module({
  controllers: [LojaController],
})
export class LojaModule {}
