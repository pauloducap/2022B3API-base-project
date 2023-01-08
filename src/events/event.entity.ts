import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Event {

  @PrimaryGeneratedColumn('uuid')
 id!: string; //au format uuidv4

  @Column()
 date!: Date;

@Column({default : 'Pending'})
 eventStatus?: 'Pending' | 'Accepted' | 'Declined' // valeur par défaut : 'Pending';
  
  @Column()
 eventType!: 'RemoteWork' | 'PaidLeave';
  
 @Column()
 eventDescription!: string;

 @PrimaryGeneratedColumn('uuid')
 userId!: string; //au format uuidv4
}
