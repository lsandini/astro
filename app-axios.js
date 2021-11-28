const express = require("express");
const formidable = require("express-formidable");
const app = express();
const fs = require("fs");
const { writeFile } = require("fs/promises");

import { createTimeOfInterest } from "astronomy-bundle/time";
import {createMoon} from 'astronomy-bundle/moon';
import { createEarth } from "astronomy-bundle/earth";
import {
  createMercury,
  createVenus,
  createMars,
  createJupiter,
  createSaturn,
  createNeptune,
} from "astronomy-bundle/planets";

app.use(express.static(__dirname + "/index-axios.html"));
app.use(formidable());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index-axios.html");
});

app.get("/JSON", (req, res) => {
  res.sendFile(__dirname + "/data.json");
});

app.post("/", (req, res) => {
  const myDate = new Date(req.fields.date);
  async function planets_now() {
    const toi = createTimeOfInterest.fromDate(myDate);
    let mercury = createMercury(toi);
    let venus = createVenus(toi);
    let earth = createEarth(toi);
    let mars = createMars(toi);
    let jupiter = createJupiter(toi);
    let saturn = createSaturn(toi);
    let neptune = createNeptune(toi);
    let moon = createMoon(toi);

    let positionme =
      await mercury.getHeliocentricEclipticSphericalJ2000Coordinates();
    let positionve =
      await venus.getHeliocentricEclipticSphericalJ2000Coordinates();
    let positionea =
      await earth.getHeliocentricEclipticSphericalJ2000Coordinates();
    let positionma =
      await mars.getHeliocentricEclipticSphericalJ2000Coordinates();
    let positionju =
      await jupiter.getHeliocentricEclipticSphericalJ2000Coordinates();
    let positionsa =
      await saturn.getHeliocentricEclipticSphericalJ2000Coordinates();
    let positionne =
      await neptune.getHeliocentricEclipticSphericalJ2000Coordinates();

    let mercurygeoSph = 
      await mercury.getGeocentricEclipticSphericalDateCoordinates();
    let venusgeoSph = 
      await venus.getGeocentricEclipticSphericalDateCoordinates();
    let marsgeoSph = 
      await mars.getGeocentricEclipticSphericalDateCoordinates();
    let jupitergeoSph = 
      await jupiter.getGeocentricEclipticSphericalDateCoordinates();
    let saturngeoSph = 
      await saturn.getGeocentricEclipticSphericalDateCoordinates();
    let neptunegeoSph = 
      await neptune.getGeocentricEclipticSphericalDateCoordinates();
    let moongeoSph = 
      await moon.getGeocentricEclipticSphericalDateCoordinates();

    let mercury_d = await mercury.getDistanceToEarth();
    let venus_d = await venus.getDistanceToEarth();
    let mars_d = await mars.getDistanceToEarth();
    let jupiter_d = await jupiter.getDistanceToEarth();
    let saturn_d = await saturn.getDistanceToEarth();
    let neptune_d = await neptune.getDistanceToEarth();
    let moon_d= await moon.getDistanceToEarth();
  

    const data = {
      mercury: positionme,
      venus: positionve,
      earth: positionea,
      mars: positionma,
      jupiter: positionju,
      saturn: positionsa,
      neptune: positionne,

      mercuryg: mercurygeoSph,
      venusg: venusgeoSph,
      marsg: marsgeoSph,
      jupiterg: jupitergeoSph,
      saturng: saturngeoSph,
      neptuneg: neptunegeoSph,
      moong: moongeoSph,
      
      mercuryd: mercury_d,
      venusd: venus_d,
      marsd: mars_d,
      jupiterd: jupiter_d,
      saturnd: saturn_d,
      neptuned: neptune_d,
      moon_d,

      mercury_mass: 0.330,
      venus_mass: 4.87,
      earth_mass: 5.97,
      mars_mass: 6.42,
      jupiter_mass: 1898,
      saturn_mass: 568,
      uranus_mass: 86.8,
      neptume_mass: 102,
      moon_mass: 0.073,
      time: myDate,
    };




    console.log("data.helio:", data);
    
    const dataJSON = JSON.stringify(data, null, 4);
    await writeFile("./data.json", dataJSON);

    res.send(JSON.stringify(data));
  }

  //planets_now();
  async function myFunc() {
    try {
        await planets_now();
        console.log('yeah !')
    } catch (e) {
        console.log("that failed", e); 
    } finally {
        console.log('excellent, that worked or maybe not!')
    }
};
myFunc();
  console.log("myDate:", myDate);
});

app.listen(process.env.PORT || 3000, () =>
  console.log("Server is running at http://localhost:${process.env.PORT}")
);
