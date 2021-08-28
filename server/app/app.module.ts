import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppService } from './app.service';
import { join } from 'path';
import { GlobalModule } from 'global/global.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'pages'),
    }),
    GlobalModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
