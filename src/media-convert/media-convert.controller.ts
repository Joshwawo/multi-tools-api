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
  Query,
} from '@nestjs/common';
import { MediaConvertService } from './media-convert.service';
import { CreateMediaConvertDto, CreateMediaConvertDtoArray, IImageTrasform } from './dto/create-media-convert.dto';
import { ValidationPipe } from '@nestjs/common'
import type { FormatEnum, AvailableFormatInfo } from 'sharp';

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

  // * DB METHODS
  // * GET METHODS
  @Get('/tmp/:fileName')
  seeTempFile(@Res() response: Response, @Param('fileName') fileName: string) {
    // console.log('Param fileName: ', fileName);
    const tempFile = this.mediaConvertService.seeTempFile(fileName);
    return response.sendFile(tempFile);
  }
  @Get('/tmp')
  getAllTmpFilesDb() {
    return this.mediaConvertService.getAllTmpFilesDb();
  }

  @Get('/tmp/user/:userId')
  getAllUserFilesDb(@Param('userId') userId: string) {
    return this.mediaConvertService.getAllUserFilesDb(userId);
  }

  @Get('/tmp/download/:fileName')
  downloadTmpFile(@Res() response: Response, @Param('fileName') fileName: string) {
    // console.log('Param fileName: ', fileName);
    const tempFile = this.mediaConvertService.seeTempFile(fileName);
    console.log('TempFile: ', tempFile);
    return response.download(tempFile);
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
  createBulkDb(
    @UploadedFiles() mediaFiles: IImageTrasform,
    @Body() body: CreateMediaConvertDto,
    @Query() query: any,
  ) {
    try {
      if (!('target' in query)) {
        throw new HttpException('No target query found', HttpStatus.BAD_REQUEST)
      }
      const validTargets = {
        avif: 'avif',
        dz: 'dz',
        gif: 'gif',
        input: 'input',
        jpeg: 'jpeg',
        jpg: 'jpg',
        png: 'png',
        tiff: 'tiff',
        tif: 'tif',
        webp: 'webp',
      }
      if (!(query.target in validTargets)) {
        throw new HttpException('Invalid target format', HttpStatus.BAD_REQUEST)
      }



      // if(!('target' in query)){
      //   throw new HttpException('Invalid target format', HttpStatus.BAD_REQUEST)
      // }
      return this.mediaConvertService.createBulkConvertDb(mediaFiles, body, query.target);
    } catch (error) {
      console.log('Error: ', error);
      throw error;
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

  @Post('/transform')
  @UseInterceptors(FileInterceptor('file'))
  transform(@UploadedFile() mediaFile: IImageTrasform) {
    return this.mediaConvertService.Uniqtransform(mediaFile, 'webp');
  }

  //* DELETE METHODS

  @Delete('/tmp/files')
  deleteTmpFiles() {
    return this.mediaConvertService.deleteTmpFiles();
  }



}
