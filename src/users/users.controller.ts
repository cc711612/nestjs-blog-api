import { Controller, Get, Post, Body, Param, NotFoundException, Put, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // POST /users
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  // GET /users
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  // GET /users/:id
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    const user = await this.usersService.findOne(parseInt(id, 10));  // 將 id 轉換為 number
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  // PUT /users/:id
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersService.update(parseInt(id, 10), updateUserDto);  // 將 id 轉換為 number
  }

  // DELETE /users/:id
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(parseInt(id, 10));  // 將 id 轉換為 number
  }
}