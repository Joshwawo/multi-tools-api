import { PartialType } from '@nestjs/swagger';
import { CreateLexicaDto } from './create-lexica.dto';

export class UpdateLexicaDto extends PartialType(CreateLexicaDto) {}
