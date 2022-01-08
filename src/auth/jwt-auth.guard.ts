// NestJS
import { ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

// Password
import { AuthGuard } from '@nestjs/passport';

// RxJs
import { of } from 'rxjs';
import { map, mergeMap, takeWhile, tap } from 'rxjs/operators';

// Services
import { UsersService } from '../users/users.service';

// Models
import { IUserFromJwt } from './model/IUserFromJwt';
import { IAuthRequest } from './model/IAuthRequest';

// Decorators
import { IS_PUBLIC_KEY } from './public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    @Inject(UsersService) private readonly usersService: UsersService,
  ) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const canActivate = super.canActivate(context);

    if (typeof canActivate === 'boolean') {
      return canActivate;
    }

    return of(canActivate).pipe(
      mergeMap((value) => value),
      takeWhile((value) => value),
      map(() => context.switchToHttp().getRequest<IAuthRequest>()),
      mergeMap((request) =>
        of(request).pipe(
          map((req) => {
            if (!req.user) {
              throw Error('User was not found in request.');
            }

            return req.user;
          }),
          mergeMap((userFromJwt: IUserFromJwt) =>
            this.usersService.findById(userFromJwt.id),
          ),
          tap((user) => {
            request.principal = user;
          }),
        ),
      ),
      map((user) => Boolean(user)),
    );
  }
}
