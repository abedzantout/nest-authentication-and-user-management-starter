import { MongoErrorHandlerInterceptor } from './mongo-error-handler.interceptor';

describe('MongoErrorHandlerInterceptor', () => {
  it('should be defined', () => {
    expect(new MongoErrorHandlerInterceptor()).toBeDefined();
  });
});
