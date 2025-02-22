import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  username!: string;

  @Column({ unique: true })
  email!: string;

  @Column({nullable:false})
  password!: string;

  @Column({ default: 'Employee' })
  role!: 'Admin' | 'Employee' | 'ProjectManager';
}

export enum UserRole {
  ADMIN = "Admin",
	EMPLOYEE = "Employee",
	PROJECTMANAGER = "ProjectManager"
}
