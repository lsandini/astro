const { copyFileSync } = require('fs');
let myData = require('./data.json');
let G = 6.67408 * 10e-11;

console.log(myData);
console.log('mass of earth:', myData.earth_mass,'*10e24 kg');
console.log('mass of mars:', myData.mars_mass,'*10e24 kg');
console.log('distance earth_mars:', myData.marsd,'km');
console.log('geocentric longitude of mars:', myData.marsg.lon,'km');

//Attraction force between planets is G * (mass1 * mass2)/dist^2 

let forceMercuryEarth = G * (( myData.earth_mass*10e24 * myData.mercury_mass*10e24 ) / Math.pow((myData.mercuryd*1000), 2) );
let forceVenusEarth = G * (( myData.earth_mass*10e24 * myData.venus_mass*10e24 ) / Math.pow((myData.venusd*1000), 2) );
let forceMarsEarth = G * (( myData.earth_mass*10e24 * myData.mars_mass*10e24 ) / Math.pow((myData.marsd*1000), 2) );
let forceJupiterEarth = G * (( myData.earth_mass*10e24 * myData.jupiter_mass*10e24 ) / Math.pow((myData.jupiterd*1000), 2) );
let forceSaturnEarth = G * (( myData.earth_mass*10e24 * myData.saturn_mass*10e24 ) / Math.pow((myData.saturnd*1000), 2) );
let forceNeptuneEarth = G * (( myData.earth_mass*10e24 * myData.neptune_mass*10e24 ) / Math.pow((myData.neptuned*1000), 2) );

console.log('Attraction force between Mercury and Earth:', forceMercuryEarth.toExponential(),'Newtons');
console.log('Attraction force between Venus and Earth:', forceVenusEarth.toExponential(),'Newtons');
console.log('Attraction force between Mars and Earth:', forceMarsEarth.toExponential(),'Newtons');
console.log('Attraction force between Jupiter and Earth:', forceJupiterEarth.toExponential(),'Newtons');
console.log('Attraction force between Saturn and Earth:', forceSaturnEarth.toExponential(),'Newtons');
console.log('Attraction force between Neptune and Earth:', forceNeptuneEarth.toExponential(),'Newtons');

// let's compute the resulting attraction force vectors of all planets on earth

let x = (forceMercuryEarth * Math.cos(myData.mercuryg.lon)) + 
(forceVenusEarth * Math.cos(myData.venusg.lon)) +
(forceMarsEarth * Math.cos(myData.marsg.lon)) +
(forceJupiterEarth * Math.cos(myData.jupiterg.lon)) +
(forceSaturnEarth * Math.cos(myData.saturng.lon)) +
(forceNeptuneEarth * Math.cos(myData.neptuneg.lon));

let y = (forceMercuryEarth * Math.sin(myData.mercuryg.lon)) + 
(forceVenusEarth * Math.sin(myData.venusg.lon)) +
(forceMarsEarth * Math.sin(myData.marsg.lon)) +
(forceJupiterEarth * Math.sin(myData.jupiterg.lon)) +
(forceSaturnEarth * Math.sin(myData.saturng.lon)) +
(forceNeptuneEarth * Math.sin(myData.neptuneg.lon));

console.log(x.toExponential(), y.toExponential());

let globalVectorLong = Math.atan(y/x) * 180 / Math.PI;
let globalVectorForce = Math.sqrt(x^2 + y^2);

console.log('global vector force:', globalVectorForce, 'Newtons');
console.log('global vector longitude:', globalVectorLong, 'degrees');
