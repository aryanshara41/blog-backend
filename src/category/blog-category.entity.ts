import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BlogCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category: string;
}
