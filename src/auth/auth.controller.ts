import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { ILoginRequestBody } from './dto/login.dto';
import { Public } from './public.decorator';

@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() { email, password }: ILoginRequestBody) {
    return this.authService.login({ email, password });
  }
}
