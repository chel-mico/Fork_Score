import "reflect-metadata"
import { DataSource } from "typeorm"

import * as dotenv from 'dotenv'
dotenv.config();

export const db = new DataSource({
    type: "cockroachdb",
    url: process.env.DATABASE_URL,
    username: "endreasy",
    password: "iiWWJJR9kc7W-R7QBryYYw",
    database: "fork_score",
    ssl: true,
    synchronize: true,
    logging: false,
    entities: ["./**/entities/**/*.js"],
    migrations: ["./**/migrations/**/*.js"]
})