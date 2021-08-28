import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { configuration } from '../config/configuartion';

@Global()
@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  exports: [HttpModule, ConfigModule],
})
export class GlobalModule {}