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

  createBulkConvert(mediaFiles: CreateMediaConvertDto[]) {
    if (!mediaFiles) {
      return {
        message: 'No file uploaded',
      };
    }
    const tmpPath = path.join(__dirname, '..', '..', 'tmp');
    const withPath = mediaFiles.map((file) => {
      return path.join(tmpPath, file as string);

    })
    return withPath;
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
  /**
   * Elimina todos los archivos de la carpeta tmp
   */
  deleteTmpFiles() {
    //Eliminar todos los arhivos de la carpeta tmp
    const tmpPath = path.join(__dirname, '..', '..', 'tmp');
    fs.readdir(tmpPath, (err, files) => {
      if (err) {
        throw new HttpException('Directory not found', HttpStatus.NOT_FOUND);
      }
      for (const file of files) {
        fs.unlink(path.join(tmpPath, file), (err) => {
          if (err) {
            throw new HttpException('Error deleting file', HttpStatus.BAD_REQUEST);
          }
        });
      }
    }
    )
    return {
      message: 'All files deleted',
    };
  }
} 
