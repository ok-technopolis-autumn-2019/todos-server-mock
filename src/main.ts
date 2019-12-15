import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    credentials: true,
    origin: (requestOrigin, callback) => {
      callback(null, true);
    },
  });

  await app.listen(3000);
}

bootstrap();
