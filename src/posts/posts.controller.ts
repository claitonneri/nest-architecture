import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaMessage } from '@nestjs/microservices/external/kafka.interface';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() { title, content, author_id }: CreatePostDto) {
    return this.postsService.create({ title, content, author_id });
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get('feed')
  getPublishedPosts() {
    return this.postsService.getPublishedPosts();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @Put('publish/:id')
  updatePublishPost(@Param('id') id: string) {
    return this.postsService.publishPosts(id, { published: true });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }

  @MessagePattern('pagamentos')
  consumer(@Payload() message: KafkaMessage): void {
    console.log(message.value);
  }
}
