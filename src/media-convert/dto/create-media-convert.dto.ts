import {IsString, IsNotEmpty } from 'class-validator';
export class CreateMediaConvertDto {
    // fileName?: string;
    // mimeType?: string;
    @IsString()
    @IsNotEmpty()
    creatorId: string;
    
    // uuid: string;
}
