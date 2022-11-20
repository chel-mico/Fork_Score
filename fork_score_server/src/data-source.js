"use strict";
exports.__esModule = true;
exports.db = void 0;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var dotenv = require("dotenv");
dotenv.config();
exports.db = new typeorm_1.DataSource({
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
});
