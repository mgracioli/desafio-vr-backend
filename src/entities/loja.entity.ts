import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'loja' })
export class LojaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'descricao', length: 100, nullable: false })
  descricao: string;
}
