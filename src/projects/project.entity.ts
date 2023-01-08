import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
 id!: string; //au format uuidv4

@Column()
 name!: string;

  @PrimaryGeneratedColumn('uuid')
 referringEmployeeId!: string; //au format uuidv4


}

