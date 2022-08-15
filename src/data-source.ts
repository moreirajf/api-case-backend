import "reflect-metadata"
import { DataSource } from "typeorm"
import { Carrier } from "./entity/Carrier"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "dbps",
    port: 5432,
    username: "postgres",
    password: "root",
    database: "case_back_end_db",
    synchronize: true,
    logging: false,
    entities: [Carrier],
    migrations: ['src/migrations/**/*.ts'],
    subscribers: [],
})
