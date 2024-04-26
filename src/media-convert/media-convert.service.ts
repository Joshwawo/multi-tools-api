import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMediaConvertDto } from './dto/create-media-convert.dto';
import { UpdateMediaConvertDto } from './dto/update-media-convert.dto';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class MediaConvertService {
  create(mediaFile: CreateMediaConvertDto) {
    if (!mediaFile) {
      return {
        message: 'No file uploaded',
      };
    }
    return mediaFile;
  }

  findAll() {
    return `This action returns all mediaConvert`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mediaConvert`;
  }

  update(id: number, updateMediaConvertDto: UpdateMediaConvertDto) {
    return `This action updates a #${id} mediaConvert`;
  }

  remove(id: number) {
    return `This action removes a #${id} mediaConvert`;
  }
  createBulkConvert(mediaFiles: CreateMediaConvertDto[]) {
    if (!mediaFiles) {
      return {
        message: 'No file uploaded',
      };
    }
    return mediaFiles;
  }
  seeTempFile(fileName: string) {
    try {
      const savedPath = path.join(__dirname, '..', '..', 'tmp', fileName);
      // Verificar si el archivo existe
      if (!fs.existsSync(savedPath)) {
        throw new HttpException('File not found', HttpStatus.NOT_FOUND, {
          cause: new Error('No se encontro el archivo solicitado'),
        });
      }
      return savedPath;
    } catch (error) {
      throw new HttpException('File not found', HttpStatus.NOT_FOUND, {
        cause: error.HttpException,
      });
    }
  }
}
