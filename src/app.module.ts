import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleModule } from './article/article.module';
import { CommentModule } from './comment/comment.module';
import { Article } from './article/article.entity';
import { Comment } from './comment/comment.entity';
import { UsersModule } from './users/users.module';
import * as dotenv from 'dotenv';
import { JwtModule } from '@nestjs/jwt';
import { configureMiddlewares } from './routes'; // 引用中間件配置文件


dotenv.config();

console.log('Database Host:', process.env.DB_HOST);
console.log('Database Username:', process.env.DB_USERNAME);
console.log('Database Name:', process.env.DB_DATABASE);
console.log('JWT Secret:', process.env.JWT_SECRET);

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
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
})

export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    configureMiddlewares(consumer); // 使用中間件配置
  }
}