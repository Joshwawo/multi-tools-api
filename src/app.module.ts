import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MediaConvertModule } from './media-convert/media-convert.module';
import { SequelizeModule } from '@nestjs/sequelize'
import {databaseConfig} from './database/sqlite'
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MediaConvertModule,
    SequelizeModule.forRoot(databaseConfig),
    ConfigModule.forRoot({
      isGlobal: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
