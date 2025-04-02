import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  date!: string;

  @Column()
  location!: string;

  @Column()
  category!: string;

  @Column({ nullable: true })
  description!: string;

  @Column({ nullable: true })
  imageUrl!: string;

  @Column('double precision', { nullable: true })
  latitude!: number;

  @Column('double precision', { nullable: true })
  longitude!: number;
}
