import bodyParser from "body-parser"
import {Express} from "express"
import {db} from "../data-source"
import {User} from "../entities/User"
const express = require('express')

const map = L.map('my-map').setView([48.1500327, 11.5753989], 10);
const myAPIKey = "d9e52789baff45589a49c14286c656bf";

var requestOptions = {
    method: 'GET',
  };

const isRetina = L.Browser.retina;
const baseUrl = "https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey={apiKey}";
const retinaUrl = "https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}@2x.png?apiKey={apiKey}";

L.tileLayer(isRetina ? retinaUrl : baseUrl, {
    attribution: '<a href="https://openmaptiles.org/" target="_blank">© OpenMapTiles</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap</a> contributors',
    apiKey: myAPIKey,
    maxZoom: 20,
    id: 'osm-bright',
}).addTo(map);

function geocodeAddress() {
  const address = document.getElementById("address").value;
  if (!address || address.length < 3) {
    console.log("The address string is too short. Enter at least three symbols");
    return;
  }

  const geocodingUrl = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=${myAPIKey}`;

    fetch(geocodingUrl).then(result => result.json())
    .then(featureCollection => {
      if (featureCollection.features.length === 0) {
        document.getElementById("status").textContent = "The address is not found";
        return;
      }

      const foundAddress = featureCollection.features[0];

      document.getElementById("status").textContent = `Found address: ${foundAddress.properties.formatted}`;

			marker = L.marker(new L.LatLng(foundAddress.properties.lat, foundAddress.properties.lon)).addTo(map);
			map.panTo(new L.LatLng(foundAddress.properties.lat, foundAddress.properties.lon));
    });
}
const locationRouter:Express = express.Router()

locationRouter.use(bodyParser.urlencoded({ extended: false }))

locationRouter.post('/location', async (req, res) =>{
    try{
        const repo = db.getRepository(Location)
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

export { locationRouter }

