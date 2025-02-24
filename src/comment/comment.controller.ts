import { Controller, Post, Body, Get, Param, NotFoundException } from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comment } from './comment.entity';

@Controller('comments')  // 這是根路由
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  // GET /comments
  @Get()
  async findAll(): Promise<Comment[]> {
    return this.commentService.findAll();
  }

  // GET /comments/:id
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Comment> {
    const comment = await this.commentService.findOne(id);
    if (!comment) {
      throw new NotFoundException(`Comment with id ${id} not found`);
    }
    return comment;
  }
}