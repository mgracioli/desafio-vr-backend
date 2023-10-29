import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity({ name: 'produto' })
export class ProdutoEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'descricao',
    length: 60,
    nullable: false
  })
  descricao: string;

  @Column({
    name: 'custo',
    type: 'numeric',
    precision: 13,
    scale: 3,
    nullable: true
  })
  custo: number;

  @Column({
    name: 'imagem',
    type: 'bytea',
    nullable: true
  })
  imagem: Buffer;
}
