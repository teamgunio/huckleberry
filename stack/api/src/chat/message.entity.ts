import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export interface iMessage {
  [body: string]: string;
  user: string;
  avatar: string | undefined;
  metadata: any | undefined;
  action: string | undefined;
  parameters: any | undefined;
  error: any | undefined;
  timestamp: string;
}

@Entity()
export class Message {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50 })
  to: string;

  @Column({ length: 150 })
  from: string;

  @Column()
  session: string;

  @Column({ type: "json", nullable: true })
  payload: iMessage;

  @Column('timestamptz')
  timestamp: Date;
}
