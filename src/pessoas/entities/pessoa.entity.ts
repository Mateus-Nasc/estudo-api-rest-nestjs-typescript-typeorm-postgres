import { IsEmail } from 'class-validator';
import { Recado } from 'src/recados/entities/recado.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Pessoa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 60 })
  nome: string;

  @Column({ length: 155 })
  passwordHash: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  //---------------------
  @OneToMany(() => Recado, recado => recado.de) //o 2º parâmetro é uma função que recebe um recado e informa qual campo vou utilizar. O campo "de" do recado é o que indica quem é a pessoa que enviou o recado
  recadosEnviados: Recado[];

  @OneToMany(() => Recado, recado => recado.para) //o campo "para" do recado é o que indica quem é a pessoa que recebeu o recado
  recadosRecebidos: Recado[];
}
