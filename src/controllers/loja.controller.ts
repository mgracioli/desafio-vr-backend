import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('/loja')
export class LojaController {
  @Post()
  public CadastraLoja(): any {
    return {
      data: 'Criou!',
    };
  }

  @Get()
  public BuscaLojas(): any {
    return {
      data: 'teste',
    };
  }

  @Get(':id')
  public BuscaLoja(): any {
    return {
      data: 'teste',
    };
  }

  @Put(':id')
  public AtualizaLoja(): any {
    return {
      data: 'teste',
    };
  }

  @Delete(':id')
  public ExcluiLoja(): any {
    return {
      data: 'teste',
    };
  }
}
