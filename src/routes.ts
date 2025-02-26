import { MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { MemoryLoggerMiddleware } from './middleware/memory-logger.middleware';
import { JwtAuthMiddleware } from './middleware/jwt-auth.middleware';

export function configureMiddlewares(consumer: MiddlewareConsumer) {
  consumer
    .apply(MemoryLoggerMiddleware)
    .forRoutes(
      { path: '/*', method: RequestMethod.ALL },
    );

  consumer
    .apply(JwtAuthMiddleware)
    .exclude(
      { path: '/users/getToken/:id', method: RequestMethod.GET },
    )
    .forRoutes(
      { path: '/*', method: RequestMethod.ALL },
    );
}