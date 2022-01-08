import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UnauthorizedError } from 'src/errors/unauthorized.error';

@Injectable()
export class UnauthorizedErrorInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof UnauthorizedError) {
          throw new NotFoundException(error.message);
        }
        throw error;
      }),
    );
  }
}
