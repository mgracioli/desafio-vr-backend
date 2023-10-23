import { IsString, MaxLength, IsNotEmpty, IsNumber, Max } from 'class-validator';

export class ProdutoSchema {
  id: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  descricao: string;

  @IsNumber({ maxDecimalPlaces: 3 })
  @Max(16)
  custo: number;

  imagem: Buffer;
}
