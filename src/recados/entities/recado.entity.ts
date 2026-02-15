import { Pessoa } from 'src/pessoas/entities/pessoa.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity() //criara uma tabela com nome recado no BD
export class Recado {
  @PrimaryGeneratedColumn() //cria uma coluna de id auto incrementável
  id: number;

  @Column({ type: 'varchar', length: 255 }) //cria uma coluna de texto com limite
  texto: string;

  @Column({ default: false })
  lido: boolean;

  @Column()
  data: Date;

  @CreateDateColumn() // O TypeORM preenche sozinho com a data de criação
  createdAt?: Date; //createdAt é criado na hr que o recado é criado, ou seja o ? é usado porque quando se cria uma nova instância de Recado no código (const r = new Recado()), o createdAt ainda não existe; ele só será gerado pelo BD após o .save() Por isso, o TS exige que marque como opcional para não dar erro de "propriedade não inicializada"

  @UpdateDateColumn() //preenche sozinho com a data de atualização
  updatedAt?: Date; //updatedAt vem junto com createdAt mas é alterado toda vez que o recado é atualizado

  //--------------------
  @ManyToOne(() => Pessoa, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }) //muitos recados podem ser enviados por uma unica pessoa
  @JoinColumn({ name: 'de' }) //cria a coluna "de" na tabela Recado, armazenando id da pessoa que enviou o recado, que é a chave estrangeira para a tabela pessoa
  de: Pessoa;

  @ManyToOne(() => Pessoa, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }) // muitos recados podem ser enviados para uma unica pessoa
  @JoinColumn({ name: 'para' }) //cria a coluna "para" na tabela Recado, guardando id da pessoa que recebeu o recado
  para: Pessoa;
}
