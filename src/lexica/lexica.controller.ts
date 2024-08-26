import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LexicaService } from './lexica.service';
import { CreateLexicaDto, SearchInfinitesPromptsDto } from './dto/create-lexica.dto';
import { UpdateLexicaDto } from './dto/update-lexica.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('lexica')
@Controller('lexica')
export class LexicaController {
  constructor(private readonly lexicaService: LexicaService) { }

  @Post()
  create(@Body() createLexicaDto: CreateLexicaDto) {
    return this.lexicaService.create(createLexicaDto);
  }

  @Post('infinites-prompts')
  searchInfinitesPrompts(@Body() searchInfinitesPromptsDto: SearchInfinitesPromptsDto) {
    return this.lexicaService.searchInfinitesPrompts(searchInfinitesPromptsDto);
  }

  @Get()
  findAll() {
    return this.lexicaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lexicaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLexicaDto: UpdateLexicaDto) {
    return this.lexicaService.update(+id, updateLexicaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lexicaService.remove(+id);
  }
}
