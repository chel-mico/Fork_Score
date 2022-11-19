import "reflect-metadata"
import { DataSource } from "typeorm"

import * as dotenv from 'dotenv'
dotenv.config();

export const db = new DataSource({
    type: "cockroachdb",
    url: "postgresql://endreasy:iiWWJJR9kc7W-R7QBryYYw@misty-katydid-6788.7tt.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full",
    username: "endreasy",
    password: "iiWWJJR9kc7W-R7QBryYYw",
    database: "fork_score",
    ssl: true,
    synchronize: true,
    logging: false,
    entities: ["./**/entities/**/*.js"],
    migrations: ["./**/migrations/**/*.js"]
})