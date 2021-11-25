const express = require('express');
const formidable = require('express-formidable');
const app = express();
const fs = require('fs');
const { writeFile } = require('fs/promises')

import {createTimeOfInterest} from 'astronomy-bundle/time';
import {createEarth} from 'astronomy-bundle/earth';
import {createMercury, createVenus, createMars, createJupiter, createSaturn, createNeptune} from 'astronomy-bundle/planets';

app.use(express.static(__dirname+'/index-axios.html'));
app.use(formidable());

app.get('/', (req, res)=>{
	res.sendFile(__dirname+'/index-axios.html');
});

app.get('/JSON', (req, res)=>{
	res.sendFile(__dirname+'/data.json');
});

app.post('/', (req, res)=>{

	const myDate = new Date(req.fields.date);
	async function planets_now(){

		const toi = createTimeOfInterest.fromDate(myDate);
		let mercury = createMercury(toi);
		let venus = createVenus(toi);
		let earth = createEarth(toi);
		let mars = createMars(toi);
		let jupiter = createJupiter(toi);
		let saturn = createSaturn(toi);
		let neptune= createNeptune(toi);
	
		let positionme = await mercury.getHeliocentricEclipticSphericalJ2000Coordinates();
		let positionve = await venus.getHeliocentricEclipticSphericalJ2000Coordinates();
		let positionea = await earth.getHeliocentricEclipticSphericalJ2000Coordinates();
		let positionma = await mars.getHeliocentricEclipticSphericalJ2000Coordinates();
		let positionju = await jupiter.getHeliocentricEclipticSphericalJ2000Coordinates();
		let positionsa = await saturn.getHeliocentricEclipticSphericalJ2000Coordinates();
		let positionne = await neptune.getHeliocentricEclipticSphericalJ2000Coordinates();
	
		const data = {'mercury':positionme,
			'venus':positionve,
			'earth':positionea,
			'mars':positionma,
			'jupiter':positionju,
			'saturn':positionsa,
			'neptune':positionne,
			'time': myDate };
	
	const dataJSON = JSON.stringify(data, null, 4);
	await writeFile('./data.json', dataJSON)
	// fs.writeFile('./data.json', dataJSON, (err) => {
	// 	if (err) {
	// 		throw err;
	// 	}
	// 	console.log("JSON data is saved.");
	// });

	console.log('data.earth:', data);
	res.send(JSON.stringify(data));
	}
	//planets_now();
	async function myFunc() {
		try {
			await planets_now();
		} catch (e) {
			console.log("that failed", e); 
		} finally {
			console.log('excellent, that worked!')
		}
	};
	myFunc();
	console.log('myDate:',myDate);
});

app.listen(process.env.PORT || 3000, 
	() => console.log('Server is running at http://localhost:${process.env.PORT}'));