import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { catchError, map } from 'rxjs/operators'

@Injectable()
export class FormatResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: unknown) => {
        return {
          success: true,
          message: 'success',
          data,
        }
      }),
      catchError((error: Error) => {
        console.error(error)
        throw new HttpException(
          'External API error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        )
      }),
    )
  }
}
