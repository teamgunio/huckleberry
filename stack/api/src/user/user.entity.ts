import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50 })
  username: string;

  @Column({ length: 150 })
  subject: string;

  @Column()
  email: string;

  @Column('timestamptz')
  createdAt: Date;
}
