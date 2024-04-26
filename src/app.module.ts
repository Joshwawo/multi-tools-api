import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MediaConvertModule } from './media-convert/media-convert.module';

@Module({
  imports: [MediaConvertModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
