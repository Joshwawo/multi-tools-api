import * as path from 'path';
import * as fs from 'fs';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMediaConvertDto } from './dto/create-media-convert.dto';
import { MediaConvertModel } from './entities/media-convert.entity'
import { InjectModel } from '@nestjs/sequelize';
import { v4 } from 'uuid';

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
  createBulkConvertDb(mediaFiles: string[], body: CreateMediaConvertDto) {
    try {
      if (!mediaFiles) {
        return {
          message: 'No file uploaded',
        };
      }
      // const tmpPath = path.join(__dirname, '..', '..', 'tmp');
      //Agregar uuid y creatorId a cada archivo
      //Crear un nuevo arreglo con los datos de los archivos
      const saveArr = mediaFiles.map((_file) => {
        return {
          fileName: _file,
          uuid: v4(),
          mimeType: _file.split('.')[1],
          creatorId: body.creatorId,
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
  //* DELETE METHODS
  async deteleAllTmpFileDb() {
    const deleteFiles = await this.productRepository.destroy({ where: {} });
    if(deleteFiles === 0){
      return {
        message: 'No files to delete',
      }
    }
    return {
      message: 'All files deleted',
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
