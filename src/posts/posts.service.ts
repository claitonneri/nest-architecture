import { Injectable } from '@nestjs/common';
import { Post } from '@prisma/client';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  async create(createPostDto: CreatePostDto): Promise<Post> {
    return undefined;
  }

  async findAll(): Promise<Post[]> {
    return undefined;
  }

  async findOne(id: number): Promise<Post | null> {
    return undefined;
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    return undefined;
  }

  async remove(id: number): Promise<void> {
    return undefined;
  }
}
