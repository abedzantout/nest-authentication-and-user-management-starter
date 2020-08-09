// success: true => message, data
// success: false => errorMessage, error

export interface ResponseInterface<T> {
  success: boolean;
  message: string;
  error_message: string;
  data: any[];
  error: any;
}
