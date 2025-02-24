import { Controller, Post, Body, Get, Param, NotFoundException } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { Article } from './article.entity';

@Controller('articles')  // 這是根路由
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  // POST /articles
  @Post()
  async create(@Body() createArticleDto: CreateArticleDto): Promise<Article> {
    return this.articleService.create(createArticleDto);
  }

  // GET /articles
  @Get()
  async findAll(): Promise<Article[]> {
    return this.articleService.findAll();
  }

  // GET /articles/:id
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Article> {
    const article = await this.articleService.findOne(id);
    if (!article) {
      throw new NotFoundException(`Article with id ${id} not found`);
    }
    return article;
  }
}