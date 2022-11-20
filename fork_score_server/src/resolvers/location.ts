import bodyParser from "body-parser"
import {Express} from "express"
import {db} from "../data-source"
import {Location} from "../entities/Location"
const express = require('express')



const locationRouter:Express = express.Router()

locationRouter.use(bodyParser.urlencoded({ extended: false }))

locationRouter.post('/location', async (req, res) =>{
    try{
        const repo = db.getRepository(Location)
        let locations = await repo.createQueryBuilder()
          .where("location.distance < :distance", {distance: req.body.distance})
          .getMany();
        if (locations) {
          let response = "<ul>\n"
          for (let i = 0; i < 10; i++) {
            response += ` <li>${locations[i].name}, ${locations[i].distance}km away</li>\n`
          }
          response += "</ul>"
          res.send(response)
        }
    } catch{
        res.send("Internal server error");
    }
});

export { locationRouter }

