import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  async findAll(): Promise<User[]> {
    return undefined;
  }

  async findOne(id: number): Promise<User | null> {
    return undefined;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return undefined;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return undefined;
  }

  async remove(id: number): Promise<void> {
    return undefined;
  }
}
