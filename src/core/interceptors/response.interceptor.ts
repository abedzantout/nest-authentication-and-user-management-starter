import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ResponseInterface } from '../response/response.interface';
import { ResponseError } from '../response/response';

@Injectable()
export class ResponseInterceptor implements NestInterceptor<ResponseInterface> {
  message: string;
  data: any[];
  error_message: any;
  error: any;
  success: boolean;

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap((response) => {
        console.log('RESPONSE');
        console.log(response);
        return response;
      }),
      catchError((error) => {
        // return new ResponseError(error.message, error.data)
        throw error;
      }),
    );
  }
}
