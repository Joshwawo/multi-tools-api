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
}
