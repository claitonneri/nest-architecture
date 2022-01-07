import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findOne(id: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        id,
      },
    });
  }

  async create({ name, email }: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data: {
        name,
        email,
      },
    });
  }

  async update(id: string, { name, email }: UpdateUserDto): Promise<User> {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
      },
    });
  }

  async remove(id: string): Promise<User> {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
