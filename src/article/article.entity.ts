import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { Comment } from '../comment/comment.entity';
import { User } from 'src/users/users.entity';

@Entity('articles')
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'content' })
  content: string;

  @Column({ name: 'status' })
  status: string;

  @Column({ name: 'seo' })
  seo: string;

  @Column({ name: 'images' })
  images: string;

  @Column({ name: 'created_by' })
  createdBy: number;

  @Column({ name: 'updated_by' })
  updatedBy: number;

  @Column({ name: 'deleted_by', nullable: true })
  deletedBy?: number;

  @Column({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt?: Date;

  @OneToMany(() => Comment, (comment) => comment.article)
  comments: Comment[];

  @ManyToOne(() => User, (user) => user.articles, { onDelete: 'CASCADE' })

  @JoinColumn({ name: 'user_id' }) // 指定關聯的外鍵欄位
  user: User;
}