// import {C} from 'sequelize-typescript'
import { Column, Table, Model } from 'sequelize-typescript'

@Table({
    tableName: 'media-convert',
})

export class MediaConvertModel extends Model { 
    @Column
    uuid: string

    @Column
    mimeType: string

    @Column
    creatorId: string

    @Column
    fileName: string

    @Column
    originalName: string
    
    @Column
    originalSize: number

    @Column
    originalMimeType: string

    @Column
    batchId: string

    @Column
    createdAt: Date
}
