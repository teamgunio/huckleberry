import { Column, Entity, PrimaryGeneratedColumn, Index } from 'typeorm';

export interface iMessage {
  [body: string]: string;
  to: string;
  from: string;
  user: string;
  avatar: string | undefined;
  metadata: any | undefined;
  action: string | undefined;
  parameters: any | undefined;
  timestamp: string;
  error: any | undefined;
}

@Entity()
export class Message {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Index("message-to-idx")
  @Column({ length: 50 })
  to: string;

  @Index("message-from-idx")
  @Column({ length: 150 })
  from: string;

  @Column({ type: "json", nullable: true })
  payload: iMessage;

  @Column('timestamptz')
  timestamp: Date;
}
