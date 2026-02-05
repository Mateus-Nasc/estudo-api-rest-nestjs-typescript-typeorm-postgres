import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity() //criara uma tabela com nome recado no BD
export class Recado {
  @PrimaryGeneratedColumn() //cria uma coluna de id auto incrementável
  id: number;

  @Column({ type: 'varchar', length: 255 }) //cria uma coluna de texto com limite
  texto: string;

  @Column({ type: 'varchar', length: 55 })
  de: string;

  @Column({ type: 'varchar', length: 55 })
  para: string;

  @Column({ default: false })
  lido: boolean;

  @Column()
  data: Date;

  @CreateDateColumn() // O TypeORM preenche sozinho com a data de criação
  createdAt?: Date; //createdAt é criado na hr que o recado é criado, e não é obrigatório no DTO, por isso o ?

  @UpdateDateColumn() // O TypeORM preenche sozinho com a data de atualização
  updatedAt?: Date; //updatedAt vem junto com createdAt mas é alterado toda vez que o recado é atualizado
}
