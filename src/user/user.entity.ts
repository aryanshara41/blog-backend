import { Blog } from 'src/blog/blog.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ default: '' })
  profilePicture: string;

  @Column()
  @Exclude()
  password: string;

  @OneToMany((type) => Blog, (blog) => blog.user, {
    cascade: true,
  })
  blog: Blog[];

  @Column({ default: UserRole.USER })
  role: string;

  async hashPassword(): Promise<void> {
    const salt = 10;
    this.password = await bcrypt.hash(this.password, salt);
  }

  async comparePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}
