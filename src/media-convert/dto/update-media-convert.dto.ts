import { PartialType } from '@nestjs/mapped-types';
import { CreateMediaConvertDto } from './create-media-convert.dto';

export class UpdateMediaConvertDto extends PartialType(CreateMediaConvertDto) {}
