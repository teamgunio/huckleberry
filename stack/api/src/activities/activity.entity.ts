import { Column, Entity, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Index("activity-user-idx")
  @Column({ length: 150 })
  user: string;

  @Column({ type: "json", nullable: true })
  payload: any;

  @Column('timestamptz')
  startedAt: Date;

  @Column('timestamptz')
  completedAt: Date;
}
