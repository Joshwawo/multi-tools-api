import * as path from 'path';
import * as fs from 'fs';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMediaConvertDto, CreateMediaConvertDtoArray, IImageTrasform } from './dto/create-media-convert.dto';
import { MediaConvertModel } from './entities/media-convert.entity'
import { InjectModel } from '@nestjs/sequelize';
import convertImage from './utils/convert-image'
import type {FormatEnum} from 'sharp';

@Injectable()
export class MediaConvertService {

  constructor(
    @InjectModel(MediaConvertModel)
    private productRepository: typeof MediaConvertModel,
  ) { }

  //* DB METHODS
  //* GET METHODS
  getAllTmpFilesDb() {
    return this.productRepository.findAll();
  }
  getAllUserFilesDb(userId: string) {
    return this.productRepository.findAll({ where: { creatorId: userId } });
  }

  //* POST METHODS
    
  async createBulkConvertDb(mediaFiles: IImageTrasform, body: CreateMediaConvertDto, target: FormatEnum ) {

    try {
      if (!mediaFiles) {
        return {
          message: 'No file uploaded',
        };
      }
      const _mediaFiles = await convertImage.transform(mediaFiles, target)
      // const tmpPath = path.join(__dirname, '..', '..', 'tmp');
      //Agregar uuid y creatorId a cada archivo
      //Crear un nuevo arreglo con los datos de los archivos
      // console.log('mediaFiles: ', mediaFiles);
      const saveArr = _mediaFiles.map((_file) => {
        return {
          ..._file,
          uuid: body.uuid,
          mimeType: _file.fileName.split('.')[1],
          creatorId: body.creatorId,
          batchId: body.batchId,
        }
      })
      return this.productRepository.bulkCreate(saveArr);
    } catch (error) {
      console.log('Error: ', error)
      throw error
      // throw new HttpException('Error creating file', HttpStatus.BAD_REQUEST, {
      //   cause: error,
      // });
    }
  }

  async Uniqtransform(mediaFiles: IImageTrasform, target: string) {
    try {
        const _mediaFiles = await convertImage.uniqueTransform(mediaFiles, target)

        return _mediaFiles

    } catch (error) {
      throw error
    }
  }
  
  // createBulkConvertDb(mediaFiles: CreateMediaConvertDtoArray[], body: CreateMediaConvertDto, target: string ) {

  //   try {
  //     if (!mediaFiles) {
  //       return {
  //         message: 'No file uploaded',
  //       };
  //     }
  //     // const tmpPath = path.join(__dirname, '..', '..', 'tmp');
  //     //Agregar uuid y creatorId a cada archivo
  //     //Crear un nuevo arreglo con los datos de los archivos
  //     console.log('mediaFiles: ', mediaFiles);
  //     const saveArr = mediaFiles.map((_file) => {
  //       return {
  //         ..._file,
  //         uuid: body.uuid,
  //         mimeType: _file.fileName.split('.')[1],
  //         creatorId: body.creatorId,
  //         batchId: body.batchId,
  //       }
  //     })
  //     return this.productRepository.bulkCreate(saveArr);
  //   } catch (error) {
  //     console.log('Error: ', error)
  //     throw error
  //     // throw new HttpException('Error creating file', HttpStatus.BAD_REQUEST, {
  //     //   cause: error,
  //     // });
  //   }
  // }
  //* DELETE METHODS
  async deteleAllTmpFileDb() {
    const deleteFiles = await this.productRepository.destroy({ where: {} });
    if (deleteFiles === 0) {
      return {
        message: 'No files to delete',
        filesDeleted: deleteFiles,
      }
    }
    return {
      message: 'All files deleted',
      filesDeleted: deleteFiles,
    };
    // console.log('deleteFiles: ', deleteFiles);
    // return deleteFiles;
  }



  //___________________________________________________________



  //* GET METHODS
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

  //* POST METHODS
  create(mediaFile: string) {
    if (!mediaFile) {
      return {
        message: 'No file uploaded',
      };
    }
    return mediaFile;
  }


  //* DELETE METHODS
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
