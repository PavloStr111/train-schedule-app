import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity()
export class Station {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;
}
