const express = require("express");
const formidable = require("express-formidable");
const app = express();
const fs = require("fs");
const { writeFile } = require("fs/promises");
const cron = require(`node-cron`);
const uploadFakeActivity = require(`./uploadFakeActivity.js`);
require(`dotenv`).config();
const fetch = require(`node-fetch`);
const mongoose = require(`mongoose`);
const { userModel, cgmSimModel } = require(`./src/user/user.model`);

const mongodbUri = process.env.MONGO_URI_IONOS;

mongoose.set(`strictQuery`, false);
mongoose.connect(mongodbUri, {}, (error) => {
  if (error) {
    console.error('mongoose.connect error: %o', error);
  }
});

const db = mongoose.connection;
db.on(`error`, console.error.bind(console, `connection error: `));
db.once(`open`, function () {
  console.log(`Connected successfully to mongoDB`);
});

// Serve static files from the current directory
app.use(express.static(__dirname));

// Use formidable for form parsing
app.use(formidable());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index-axios.html");
});

app.get("/JSON", (req, res) => {
  res.sendFile(__dirname + "/data.json");
});

app.get('/libre-monitor', (req, res) => {
    res.sendFile(__dirname + '/libre-monitor.html');
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
    let moon_illuminated_fraction = await moon.getIlluminatedFraction();
  

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
      moon_d: moon_d,
      moon_IF: moon_illuminated_fraction,

      mercury_mass: 0.330,
      venus_mass: 4.87,
      earth_mass: 5.97,
      mars_mass: 0.64,
      jupiter_mass: 1898,
      saturn_mass: 568,
      uranus_mass: 86.8,
      neptune_mass: 102,
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



app.get(`/refreshLastNSupdateDirect`, async (req, res) => {
  const email = req.query.email; // Extract email from the request query parameters
  try {


    // Use Promise.all to run both queries concurrently
    const [userResult, cgmResult] = await Promise.all([
      userModel.findOne({ email }),
      cgmSimModel.findOne({ email }),
    ]);

    if (userResult && cgmResult) {
      // Combine the results into a single JSON object
      const combinedResult = {
        lastNSupdate: userResult.lastNSupdate,
        onOffSwitch: cgmResult.onOffSwitch,
      };

      // Return the combined JSON object in the response
      res.json(combinedResult);
    } else {
      res.status(404).json({ error: 'User or CGM data not found' });
    }
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(process.env.PORT || 3000, () =>
  console.log(`Server is running at http://localhost:${process.env.PORT}`)
);

// uploadFakeActivity();
// const cronUploadFakeActivity = cron.schedule(`0,5,10,15,20,25,30,35,40,45,50,55 * * * *`, uploadFakeActivity, false); //periodically execution. First after 5 minutes. 
// cronUploadFakeActivity.start();