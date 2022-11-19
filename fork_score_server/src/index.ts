import { Express } from 'express'
const express = require('express')
const bcrypt = require('bcrypt');
const path = require("path");
const bodyParser = require('bodyparser');
import {User} from './entities/User'

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
app.use(express.static(path.join(__dirname,'./login')));

app.get('/',(_,res) => {
    res.sendFile(path.join(__dirname,'./login/login.html'));
});

app.post('/register', async (req, res) =>{
    try{
        const repo = db.getRepository(User)
        let foundUser = await repo.findOneBy({
            username: req.body.username
        })
        if (!foundUser) {

            let hashPassword = await bcrypt.hash(req.body.password, 10);

            const newUser = repo.create({
                username: req.body.username,
                password: hashPassword,
            })
            await repo.save(newUser)
            console.log('User list', repo.findOneBy({
                username: newUser.username
            }));
            
            res.send("<div align ='center'><h2>Registration successful</h2></div><br><br><div align='center'><a href='./login.html'>login</a></div><br><br><div align='center'><a href='./registration.html'>Register another user</a></div>");
        } else {
            res.send("<div align ='center'><h2>Email already used</h2></div><br><br><div align='center'><a href='./registration.html'>Register again</a></div>");
        }
    } catch{
        res.send("Internal server error");
    }
});

app.post('/login', async (req, res) => {
    try{
        const repo = db.getRepository(User)
        let foundUser = await repo.findOneBy({
            username: req.body.username
        })
        if (foundUser) {
    
            let submittedPass = req.body.password; 
            let storedPass = foundUser.password; 
    
            const passwordMatch = await bcrypt.compare(submittedPass, storedPass);
            if (passwordMatch) {
                let username = foundUser.username;
                res.send(`<div align ='center'><h2>Login successful</h2></div><br><br><br><div align ='center'><h3>Hello ${username}</h3></div><br><br><div align='center'><a href='./login.html'>logout</a></div>`);
            } else {
                res.send("<div align ='center'><h2>Invalid email or password</h2></div><br><br><div align ='center'><a href='./login.html'>login again</a></div>");
            }
        }
        else {
            res.send("<div align ='center'><h2>Invalid email or password</h2></div><br><br><div align='center'><a href='./login.html'>login again<a><div>");
        }
    } catch{
        res.send("Internal server error");
    }
});

app.listen(3000, () => {
    console.log(`server started at port ${3000}`);
});