import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

/**
 * 获取服务端启动端口
 * 
 * @param app 
 * @returns 
 */
function getPort(app: INestApplication) {
  return app.get(ConfigService).get('port');
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(getPort(app));
}

bootstrap();
