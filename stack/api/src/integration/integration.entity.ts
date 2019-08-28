import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Integration {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 25 })
  type: string;

  @Column()
  user: string;

  @Column()
  name: string;

  @Column('timestamptz')
  createdAt: Date;
}
