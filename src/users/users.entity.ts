import { Article } from 'src/article/article.entity';
import { Comment } from 'src/comment/comment.entity'; // 確保正確導入 Comment 類型
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity('users')  // 指定資料表名稱
export class User {
  @PrimaryGeneratedColumn()
  id: number;  // 將 id 類型設置為 number

  @Column({ unique: true })
  name: string;

  @Column()
  password: string;

  @Column({ nullable: false })
  email: string;

  @Column()
  images: string;

  @CreateDateColumn({ name : 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name : 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Article, (article) => article.user)
  articles: Article[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
}