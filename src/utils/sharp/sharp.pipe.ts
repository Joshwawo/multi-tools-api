import { HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import * as path from 'node:path';
import * as fs from 'fs';
import * as sharp from 'sharp';
import { v4 } from 'uuid'



@Injectable()
export class SharpPipe
  implements PipeTransform<Express.Multer.File, Promise<string>> {
  async transform(image: Express.Multer.File): Promise<string> {
    if (!image) {
      throw new HttpException('Empty file', HttpStatus.BAD_REQUEST);
    }
    const originalName = path.parse(image.originalname).name;
    const filename = Date.now() + '-' + originalName + '.webp';

    await sharp(image.buffer)
      // .resize(800)
      .webp({ effort: 3 })
      .toFile(path.join('tmp', filename));
    return filename;
    // .webp({ quality: 80 })
    // .toFile(`./uploads/${fileName}`);
  }
}

@Injectable()
export class SharpPipeArray
  implements PipeTransform<Express.Multer.File, Promise<string>> {
  async transform(image: any): Promise<any> {
    //Ruta donde se guardaran las imagenes
    const savedPath = path.join(__dirname, '..', '..', '..', 'tmp');
    //Verificar si es un array
    const isArrayOfFiles = Array.isArray(image.file);
    //Verificar que las imagenes, no pesen mas de 5MB
    const mbMax = 5 * 1024 * 1024;
    if (isArrayOfFiles) {
      const _files = image.file as Express.Multer.File[];
      for (const file of _files) {
        if (file.size > mbMax) {
          throw new HttpException(
            'File too large',
            HttpStatus.BAD_REQUEST,
          );
        }
      }
    } else {
      if (image.file.size > mbMax) {
        throw new HttpException(
          'File too large',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    //Verificar si existe la carpeta tmp
    if (!fs.existsSync(savedPath)) {
      //Si no existe crearla
      fs.mkdirSync(savedPath);
    }

    //Verificar si es un array
    if (isArrayOfFiles) {
      const _files = image.file as Express.Multer.File[];
      const filenames: string[] = [];
      for (const file of _files) {
        const originalName = path.parse(file.originalname).name;
        const filename = v4() + '.webp';
        await sharp(file.buffer)
          .webp({ quality: 80 })
          .toFile(path.join('tmp', filename));
        filenames.push(filename);
      }
      return filenames;
    }
  }
}
