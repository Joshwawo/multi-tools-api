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
  Delete,
  Body,
  UsePipes,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { MediaConvertService } from './media-convert.service';
import { CreateMediaConvertDto } from './dto/create-media-convert.dto';
import {ValidationPipe} from '@nestjs/common'
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
  constructor(private readonly mediaConvertService: MediaConvertService) { }
  @Get('/tmp/:fileName')
  seeTempFile(@Res() response: Response, @Param('fileName') fileName: string) {
    // console.log('Param fileName: ', fileName);
    const tempFile = this.mediaConvertService.seeTempFile(fileName);
    return response.sendFile(tempFile);
  }
  // * DB METHODS
  // * GET METHODS
  @Get('/tmp')
  getAllTmpFilesDb() {
    return this.mediaConvertService.getAllTmpFilesDb();
  }

  @Get('/tmp/user/:userId')
  getAllUserFilesDb(@Param('userId') userId: string) {
    return this.mediaConvertService.getAllUserFilesDb(userId);
  }

  // * POST METHODS
  @Post('/webp-bulk')
  @UseInterceptors(
    FileFieldsInterceptor([
      {
        name: 'file',
        maxCount: 5,
      },
    ]),
  )
  // @UsePipes(new ValidationPipe())
  createBulkDb(@UploadedFiles(SharpPipeArray) mediaFiles: string[], @Body() body: CreateMediaConvertDto) {
    try {
      console.log("BODY: ", body)
      return this.mediaConvertService.createBulkConvertDb(mediaFiles, body);
    } catch (error) {
      console.log('Error: ', error);
      throw new HttpException('Error creating file', HttpStatus.BAD_REQUEST)
    }
  }

  // * DELETE METHODS
  @Delete('/tmp')
  deteleAllTmpFileDb() {
    return this.mediaConvertService.deteleAllTmpFileDb();
  }

  //----------------------------------------------//
  // * POST METHODS
  @Post('/webp')
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile(SharpPipe) mediaFile: string) {
    return this.mediaConvertService.create(mediaFile);
  }

  //* DELETE METHODS


  @Delete('/tmp/files')
  deleteTmpFiles() {
    return this.mediaConvertService.deleteTmpFiles();
  }



}
