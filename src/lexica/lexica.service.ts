import { Injectable } from '@nestjs/common';
import { CreateLexicaDto, SearchInfinitesPromptsDto } from './dto/create-lexica.dto';
import { UpdateLexicaDto } from './dto/update-lexica.dto';
import axios from 'axios';

@Injectable()
export class LexicaService {
  create(createLexicaDto: CreateLexicaDto) {
    return 'This action adds a new lexica';
  }

  findAll() {
    return `This action returns all lexica`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lexica`;
  }

  update(id: number, updateLexicaDto: UpdateLexicaDto) {
    return `This action updates a #${id} lexica`;
  }

  remove(id: number) {
    return `This action removes a #${id} lexica`;
  }
  async searchInfinitesPrompts(searchInfinitesPromptsDto: SearchInfinitesPromptsDto) {
    try {
      const res = await axios.get("https://lexica.art/api/infinite-prompts", {
        data: searchInfinitesPromptsDto
      });
      return res.data;
    } catch (error) {
      console.log("🗿 ~ MangasService ~ findAll ~ error:", error)

    }
  }
}
