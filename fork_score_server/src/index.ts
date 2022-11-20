import { Express } from 'express'
const express = require('express')
const path = require("path");
const bodyParser = require('body-parser');
import {loginRouter} from './resolvers/login'
import { db } from "./data-source"
import * as dotenv from 'dotenv'
import { locationRouter } from './resolvers/location';
import { Restaurant } from './entities/Restaurant';
import { Item } from './entities/Item';
import { Location } from './entities/Location';
dotenv.config();

db.initialize()
    .then(async() => {
        console.log("Data Source has been initialized!")
        const restaurantRepo = db.getRepository(Restaurant)
        const restaurants = await restaurantRepo
            .createQueryBuilder("restaurant")
            .getMany();
        const itemRepo = db.getRepository(Item)
        const locationRepo = db.getRepository(Location)
        for (let i = 0; i < restaurants.length; i++) {
            let itemScores:number[] = []
            const items = await itemRepo
                .createQueryBuilder("item")
                .where("item.restaurant = :restaurant", {restaurant: restaurants[i].id})
                .getMany()
            for (let j = 0; j < items.length; j++) {
                const item = items[j]
                let thisItemScore = 5
                if (item.protein / (item.carbs + item.fat) <= 0.3) {
                    thisItemScore -= 4
                } else if (item.protein / (item.carbs + item.fat) <= 0.5) {
                    thisItemScore -= 2
                } else if (item.protein / (item.carbs + item.fat) >= 0.7) {
                    thisItemScore += 2
                } else if (item.protein / (item.carbs + item.fat) >= 1) {
                    thisItemScore += 4
                }

                if (item.calories > 600) {
                    thisItemScore -= 1
                } else {
                    thisItemScore += 1
                }
                itemScores.push(thisItemScore)
            }
            let score = 0
            for (let j = 0; j < itemScores.length; j++) {
                score += itemScores[j]
            }
            score /= itemScores.length
            const locations = await locationRepo
                .createQueryBuilder("location")
                .where("location.restaurant = :restaurant", {restautant: restaurants[i].id})
                .getMany()
            locations.forEach(async (lo) => {
                lo.score = score
                await locationRepo.save(lo)
            })
        }
        
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
app.use("/", locationRouter)

app.listen(3000, () => {
    console.log(`server started at port ${3000}`);
});