import { Injectable } from '@nestjs/common';
import { Post } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ title, content, author_id }: CreatePostDto): Promise<Post> {
    return this.prisma.post.create({
      data: {
        title,
        content,
        author: {
          connect: {
            id: author_id,
          },
        },
      },
      include: {
        author: true,
      },
    });
  }

  async findAll(): Promise<Post[]> {
    return this.prisma.post.findMany();
  }

  async findOne(id: string): Promise<Post | null> {
    return this.prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        author: true,
      },
    });
  }

  async getPublishedPosts(): Promise<Post[]> {
    return this.prisma.post.findMany({
      where: {
        published: true,
      },
    });
  }

  async publishPosts(id: string, { published }): Promise<Post> {
    return this.prisma.post.update({
      where: {
        id,
      },
      data: {
        published,
      },
    });
  }

  async update(id: string, { title, content }: UpdatePostDto): Promise<Post> {
    return this.prisma.post.update({
      data: {
        title,
        content,
      },
      where: {
        id,
      },
    });
  }

  async remove(id: string): Promise<Post> {
    return this.prisma.post.delete({
      where: {
        id,
      },
    });
  }
}
