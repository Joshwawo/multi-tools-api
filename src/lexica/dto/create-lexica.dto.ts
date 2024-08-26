import { IsNotEmpty, IsNumber } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
export class CreateLexicaDto {}


export class SearchInfinitesPromptsDto {
    @ApiProperty({ description: 'The cursor', example: 100 })
    @IsNotEmpty()
    @IsNumber()
    cursor: number;
  
    @ApiProperty({ description: 'The text', example: 'd309eb27-c3f1-44f3-859f-0d142ccc389c' })
    // @IsNotEmpty()
    text: string;
  
    @ApiProperty({ description: 'The model', example: 'lexica-aperture-v3.5' })
    @IsNotEmpty()
    model: string;
  
    @ApiProperty({ description: 'The search mode', example: 'images' })
    @IsNotEmpty()
    searchMode: string;
  
    @ApiProperty({ description: 'The source', example: 'search' })
    @IsNotEmpty()
    source: string;
  
  
  }
