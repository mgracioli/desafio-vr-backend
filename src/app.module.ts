import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LojaModule } from './modules/loja.module';
import { ConfigModule } from '@nestjs/config';
import { PostgresConfigService } from './configs/postgres.config.service';
import { TesteModule } from './teste/teste.module';
import { ProdutoModule } from './modules/produto.module';
import { Validators } from './schemas/validators';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
    LojaModule,
    TesteModule,
    ProdutoModule
  ],
  controllers: [AppController],
  providers: [AppService, Validators],
})
export class AppModule { }
