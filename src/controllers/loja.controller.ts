import { Controller, Get, Param } from '@nestjs/common';
import { LojaService } from 'src/services/loja.service';

@Controller('/loja')
export class LojaController {
  constructor(private readonly lojaService: LojaService) { }

  @Get()
  buscarLojas(): any {
    return this.lojaService.buscarLojas();
  }

  @Get(':id')
  buscarLoja(@Param('id') id: string): any {
    return this.lojaService.buscarLoja(+id);
  }
}
