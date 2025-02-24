import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Article } from '../article/article.entity';
import { User } from '../users/users.entity';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'article_id' })
  articleId: number;

  @Column({ name: 'content' })
  content: string;

  @Column({ name: 'status' })
  status: string;

  @Column({ name: 'logs' })
  logs: string;

  @Column({ name: 'created_by' })
  createdBy: number;

  @Column({ name: 'updated_by' })
  updatedBy: number;

  @Column({ name: 'deleted_by', nullable: true })
  deletedBy?: number;

  @Column({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt?: Date;

  @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' }) // 指定關聯的外鍵欄位
  user: User;

  @ManyToOne(() => Article, (article) => article.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'article_id' }) // 指定關聯的外鍵欄位
  article: Article;
}