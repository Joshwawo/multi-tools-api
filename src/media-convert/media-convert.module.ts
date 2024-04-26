import { Module } from '@nestjs/common';
import { MediaConvertService } from './media-convert.service';
import { MediaConvertController } from './media-convert.controller';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@Module({
  imports: [
    MulterModule.register({
      storage: memoryStorage(),
    }),
  ],
  controllers: [MediaConvertController],
  providers: [MediaConvertService],
})
export class MediaConvertModule {}
