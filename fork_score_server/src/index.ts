import { Express } from 'express'
const express = require('express')
const path = require("path");
const bodyParser = require('body-parser');
import {loginRouter} from './resolvers/login'

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

const app:Express = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'../../fork_score_client/login')));

app.get('/',(_,res) => {
    res.sendFile(path.join(__dirname,'../../fork_score_client/login/login.html'));
});

app.use("/", loginRouter)
app.use("/location", locationRouter)

app.listen(3000, () => {
    console.log(`server started at port ${3000}`);
});