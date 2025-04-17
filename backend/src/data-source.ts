import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Station } from "./entity/Station"
import { Train } from "./entity/Train"
import dotenv from 'dotenv'

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [User,Station,Train],
    migrations: [],
    subscribers: [],
})
