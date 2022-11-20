import "reflect-metadata"
import { DataSource } from "typeorm"

import * as dotenv from 'dotenv'
dotenv.config();

export const db = new DataSource({
    type: "cockroachdb",
    url: "url-here",
    username: "username-here",
    password: "password-here",
    database: "fork_score",
    ssl: true,
    synchronize: true,
    logging: false,
    entities: ["./**/entities/**/*.js"],
    migrations: ["./**/migrations/**/*.js"]
})