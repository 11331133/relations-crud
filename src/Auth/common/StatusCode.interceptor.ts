import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Status } from '../../_common/domain/ReturnMessage';

@Injectable()
export class StatusCodeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (data && data.status === Status.fail) {
          context.switchToHttp().getResponse().status(data.code);

          data = { ...data, code: undefined };
        }
        return data;
      }),
    );
  }
}
