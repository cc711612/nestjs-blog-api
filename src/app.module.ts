import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleModule } from './article/article.module';
import { CommentModule } from './comment/comment.module';
import { Article } from './article/article.entity';
import { Comment } from './comment/comment.entity';
import { MemoryLoggerMiddleware } from './middleware/memory-logger.middleware';
import { UsersModule } from './users/users.module';
import * as dotenv from 'dotenv';

dotenv.config();

console.log('Database Host:', process.env.DB_HOST);
console.log('Database Username:', process.env.DB_USERNAME);
console.log('Database Name:', process.env.DB_DATABASE);

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Article, Comment],
      autoLoadEntities: true,
      synchronize: false,
    }),
    CommentModule,
    ArticleModule,
    UsersModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MemoryLoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}