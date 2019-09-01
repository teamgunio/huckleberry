import { Column, Entity, PrimaryGeneratedColumn, Index } from 'typeorm';

export interface iParams {
  [body: string]: string;
}

export interface iTemplate {
  [body: string]: string;
}

@Entity()
export class Skill {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Index("skill-name-idx")
  @Column({ length: 50 })
  name: string;

  @Column({ length: 25 })
  type: string;

  @Column()
  action: string;

  @Column({ type: "json", nullable: true })
  params: iParams;

  @Column({ length: 25 })
  provider: string;

  @Column({ length: 25, default: 'Training' })
  state: string;

  @Column({ type: "json", nullable: true })
  template: iTemplate;

  @Column({ length: 150 })
  createdBy: string;

  @Index("skill-createdAt-idx")
  @Column('timestamptz')
  createdAt: Date;

  @Index("skill-updatedAt-idx")
  @Column('timestamptz')
  updatedAt: Date;
}
