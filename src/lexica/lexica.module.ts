import { Module } from '@nestjs/common';
import { LexicaService } from './lexica.service';
import { LexicaController } from './lexica.controller';

@Module({
  controllers: [LexicaController],
  providers: [LexicaService]
})
export class LexicaModule {}
