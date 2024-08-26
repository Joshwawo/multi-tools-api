import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import * as path from 'node:path';
import * as fs from 'fs';
import * as sharp from 'sharp';
import type { FormatEnum, AvailableFormatInfo } from 'sharp';
import { v4 } from 'uuid';
import {
  CreateMediaConvertDtoArray,
  IImageTrasform,
} from '../../media-convert/dto/create-media-convert.dto';

async function transform(
  image: IImageTrasform,
  target: FormatEnum | AvailableFormatInfo,
) {
  console.log('TARGET: ', target);
  //Ruta donde se guardaran las imagenes
  const savedPath = path.join(__dirname, '..', '..', '..', 'tmp');
  //Verificar si es un array
  const isArrayOfFiles = Array.isArray(image.file);
  //Verificar que las imagenes, no pesen mas de 5MB
  const mbMax = 5 * 1024 * 1024;
  if (isArrayOfFiles) {
    const _files = image.file;
    for (const file of _files) {
      if (file.size > mbMax) {
        throw new HttpException('File too large', HttpStatus.BAD_REQUEST);
      }
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

    const filenames: CreateMediaConvertDtoArray[] = [];
    for (const file of _files) {
      try {
        const filename = v4() + `.${target}`
        await sharp(file.buffer)
          .toFormat(target as AvailableFormatInfo)
          .toFile(path.join('tmp', filename));
        filenames.push({
          fileName: filename,
          // uuid: v4(),
          originalMimeType: file.mimetype,
          originalName: file.originalname,
          originalSize: file.size,
        });
      } catch (error) {
        console.log('Error: ', error)
        throw new HttpException('Error creating file', HttpStatus.BAD_REQUEST)
      }
    }
    return filenames;
  }
}

async function uniqueTransform(
  _image: any,
  target: string,
) {
  try {
    //Ruta donde se guardaran las imagenes
    const savedPath = path.join(__dirname, '..', '..', '..', 'tmp');
    console.log('savedPath: ', savedPath);
    console.log('_image: ', _image);
    const image = _image   //Verificar que las imagenes, no pesen mas de 5MB
    const mbMax = 5 * 1024 * 1024;
    if (image.size > mbMax) {
      throw new HttpException('File too large', HttpStatus.BAD_REQUEST);
    }
    //Verificar si existe la carpeta tmp
    if (!fs.existsSync(savedPath)) {
      //Si no existe crearla
      fs.mkdirSync(savedPath);
    }
    //Nombre de la imagen
    const originalName = path.parse(image.originalname).name;
    const filename = Date.now() + '-' + originalName + '.webp';

    await sharp(image.buffer)
      .webp({ effort: 3 })
      .toFile(path.join('tmp', filename));
    return filename;
  } catch (error) {
    console.log('Error: ', error);
    throw new HttpException('Error creating file', HttpStatus.BAD_REQUEST);
  }
}

export default {
  transform,
  uniqueTransform,
};
