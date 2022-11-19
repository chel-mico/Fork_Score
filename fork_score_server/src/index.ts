const express = require('express')
import { db } from "./data-source"

import * as dotenv from 'dotenv'
dotenv.config();

db.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

const app = express()

app.listen(3000, () => {
    console.log(`server started at port ${3000}`);
});