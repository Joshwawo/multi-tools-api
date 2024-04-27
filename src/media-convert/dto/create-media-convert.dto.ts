import {IsString, IsNotEmpty } from 'class-validator';
export class CreateMediaConvertDto {
    // fileName?: string;
    // mimeType?: string;
    @IsString()
    @IsNotEmpty()
    creatorId: string;

    @IsString()
    @IsNotEmpty()
    batchId: string;

    @IsString()
    @IsNotEmpty()
    uuid: string;
    
    // uuid: string;
}

export class CreateMediaConvertDtoArray {
    fileName: string;
    uuid?: string;
    originalName: string;
    originalSize: number;
    originalMimeType: string;
    batchId?: string;
}