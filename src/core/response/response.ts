import { ResponseInterface } from './response.interface';

export class ResponseError<T> implements ResponseInterface<T> {
  message: string;
  data: any[];
  error_message: any;
  error: any;
  success: boolean;

  constructor(infoMessage: string, data?: any) {
    this.success = false;
    this.message = infoMessage;
    this.data = data;
    console.warn(
      new Date().toString() +
        ' - [Response]: ' +
        infoMessage +
        (data ? ' - ' + JSON.stringify(data) : ''),
    );
  }
}

export class ResponseSuccess<T> implements ResponseInterface<T> {
  message: string;
  data: any[];
  error_message: any;
  error: any;
  success: boolean;

  constructor(infoMessage: string, data?: any, notLog?: boolean) {
    this.success = true;
    this.message = infoMessage;
    this.data = data;
    if (!notLog) {
      try {
        const offuscateRequest = JSON.parse(JSON.stringify(data));
        if (offuscateRequest && offuscateRequest.token)
          offuscateRequest.token = '*******';
        console.log(
          new Date().toString() +
            ' - [Response]: ' +
            JSON.stringify(offuscateRequest),
        );
      } catch (error) {}
    }
  }
}
