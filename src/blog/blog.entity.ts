import { User } from 'src/user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { BlogCategory } from '../category/blog-category.entity';

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  poster: string;

  @ManyToMany((type) => BlogCategory)
  @JoinTable()
  categories: BlogCategory[];

  @CreateDateColumn()
  date: Date;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ default: 0 })
  likes: number;

  @ManyToOne((type) => User, (User) => User.blog)
  user: User;
}
