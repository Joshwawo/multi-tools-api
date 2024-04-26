import {SequelizeModuleOptions} from '@nestjs/sequelize'

export const databaseConfig: SequelizeModuleOptions = {
    dialect: 'sqlite',
    storage: '.db/data.sqlite',
    autoLoadModels: true,
    synchronize: true,
}