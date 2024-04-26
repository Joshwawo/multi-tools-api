import { Module } from '@nestjs/common';
import { MediaConvertService } from './media-convert.service';
import { MediaConvertController } from './media-convert.controller';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
// import { Sequelize } from 'sequelize';
import { MediaConvertModel}  from './entities/media-convert.entity'
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    MulterModule.register({
      storage: memoryStorage(),
    }),
    SequelizeModule.forFeature([MediaConvertModel
      
    ]),
  ],
  controllers: [MediaConvertController],
  providers: [MediaConvertService],
})
export class MediaConvertModule {}
