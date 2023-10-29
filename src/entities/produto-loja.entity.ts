import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  BaseEntity,
} from 'typeorm';
import { ProdutoEntity } from './produto.entity';
import { LojaEntity } from './loja.entity';

@Entity({ name: 'produtoloja' })
export class ProdutoLojaEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProdutoEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_produto' })
  produto: ProdutoEntity;
  @Column({
    name: 'id_produto',
    type: 'number',
    nullable: false
  })
  id_produto: number;

  @ManyToOne(() => LojaEntity)
  @JoinColumn({ name: 'id_loja' })
  loja: LojaEntity;
  @Column({
    name: 'id_loja',
    type: 'number',
    nullable: false
  })
  id_loja: number;

  @Column({
    name: 'preco_venda',
    type: 'numeric',
    precision: 13,
    scale: 3,
    nullable: true,
  })
  preco_venda: number;
}
