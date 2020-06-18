import {
  CallHandler,
  ExecutionContext,
  HttpException, HttpStatus,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MongoError } from 'mongodb';

@Injectable()
export class MongoErrorHandlerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle()
      .pipe(catchError(error => {
        if (error instanceof MongoError && error.code === 11000) {
          throw new NotFoundException(
            {
              message: MongoErrorHandlerInterceptor.handleDuplicationUserMessage(context.getHandler().name),
              status: HttpStatus.NOT_FOUND,
            },
          );
        } else {
          throw error;
        }
      }));
  }

  private static handleDuplicationUserMessage(handlerName: string) {
    switch (handlerName) {
      case 'register' : {
        return 'User already exists';
      }

      case 'login': {
        return 'Wrong email/password combination';
      }
    }
  }
}


