import { IsOptional, IsString, IsUUID } from 'class-validator';
import { Post } from '../entities/post.entity';

export class CreatePostDto extends Post {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsUUID()
  author_id: string;
}
