import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { ILoginRequestBody } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { UnauthorizedError } from 'src/errors/unauthorized.error';
import { IUserPayload } from './model/IUserPayload';
import { IUserToken } from './model/IUserToken';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async login({ email, password }: ILoginRequestBody): Promise<IUserToken> {
    const user: User = await this.validateUser({ email, password });

    const payload: IUserPayload = {
      username: user.email,
      sub: user.id,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async validateUser({ email, password }: ILoginRequestBody): Promise<User> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new Error('User not exists.');
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      throw new UnauthorizedError(
        'Email address or password provided is incorrect.',
      );
    }

    delete user.password;

    return user;
  }
}
