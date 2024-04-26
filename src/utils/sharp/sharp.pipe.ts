import { Injectable, PipeTransform } from '@nestjs/common';
import * as path from 'node:path';
import * as fs from 'fs';
import * as sharp from 'sharp';



@Injectable()
export class SharpPipe
  implements PipeTransform<Express.Multer.File, Promise<string>>
{
  async transform(image: Express.Multer.File): Promise<string> {
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
  implements PipeTransform<Express.Multer.File, Promise<string>>
{
  async transform(image: any): Promise<any> {
    const savedPath = path.join(__dirname, '..', '..', '..', 'tmp');
    console.log("Path: ", savedPath);
    if (Array.isArray(image.file)) {
      const _files = image.file as Express.Multer.File[];
      const filenames: string[] = [];
      for (const file of _files) {
        const originalName = path.parse(file.originalname).name;
        const filename = Date.now() + '-' + originalName + '.webp';
        await sharp(file.buffer)
          .webp({ quality: 80 })
          .toFile(path.join('tmp', filename));
        filenames.push(filename);
      }
      return filenames;
    }
  }
}
