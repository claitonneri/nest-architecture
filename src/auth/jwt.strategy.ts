import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { IUserFromJwt } from './model/IUserFromJwt';
import { IUserPayload } from './model/IUserPayload';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: IUserPayload): Promise<IUserFromJwt> {
    return { id: payload.sub, email: payload.username };
  }
}
