import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Station } from "./entity/Station"
import { Train } from "./entity/Train"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "TrainSchedule",
    synchronize: true,
    logging: false,
    entities: [User,Station,Train],
    migrations: [],
    subscribers: [],
})
