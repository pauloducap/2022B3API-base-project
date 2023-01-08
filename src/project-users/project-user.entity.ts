import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class ProjectUser {
  @PrimaryGeneratedColumn('uuid')
  id!: string; //au format uuidv4

  @Column()
  startDate!: Date; 

  @Column()
  endDate!: Date; 
  
  @PrimaryGeneratedColumn('uuid')
  projectId!: string; //au format uuidv4

  @PrimaryGeneratedColumn('uuid')
   userId!: string; //au format uuidv4

}
