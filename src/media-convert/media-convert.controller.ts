import {
  Controller,
  Get,
  Post,
  // Body,
  // Patch,
  Param,
  // Delete,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Res,
} from '@nestjs/common';
import { MediaConvertService } from './media-convert.service';
// import { CreateMediaConvertDto } from './dto/create-media-convert.dto';
// import { UpdateMediaConvertDto } from './dto/update-media-convert.dto';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { SharpPipe, SharpPipeArray } from 'src/utils/sharp/sharp.pipe';
import { Response } from 'express';
@Controller('media-convert')
export class MediaConvertController {
  // eslint-disable-next-line no-unused-vars
  constructor(private readonly mediaConvertService: MediaConvertService) {}

  @Post('/webp')
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile(SharpPipe) mediaFile: string) {
    return this.mediaConvertService.create(mediaFile);
  }

  @Post('/webp-bulk')
  @UseInterceptors(
    FileFieldsInterceptor([
      {
        name: 'file',
        maxCount: 5,
      },
    ]),
  )
  createBulk(@UploadedFiles(SharpPipeArray) mediaFiles: string[]) {
    return this.mediaConvertService.createBulkConvert(mediaFiles);
  }
  @Get('/temp/:fileName')
  seeTempFile(@Res() response: Response, @Param('fileName') fileName: string) {
    console.log('Param fileName: ', fileName);
    const tempFile = this.mediaConvertService.seeTempFile(fileName);
    return response.sendFile(tempFile);
  }

  @Get()
  findAll() {
    return this.mediaConvertService.findAll();
  }
}
