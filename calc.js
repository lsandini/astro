let myData = require('./data.json');
let myEarth = myData.earth;

console.log('myEarth:', myEarth);
console.log(myData.earth.lon);
console.log('mass of earth:', myData.earth_mass,'*10e24 kg');
console.log('mass of mars:', myData.mars_mass,'*10e24 kg');
console.log('distance earth_mars:', myData.marsd,'km');
let G = 6.674 * 10e-11;
console.log(G);

let force = G * (( myData.earth_mass*10e24 * myData.mars_mass*10e24 ) / Math.pow((myData.marsd*1000), 2) );

console.log('Attraction force between mars and earth:', force.toExponential(),'Newtons');
