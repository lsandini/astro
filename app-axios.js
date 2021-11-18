const express = require('express');
const formidable = require('express-formidable');

var planets_now = require('./all-mod.js');
const myDate = new Date();
module.exports = myDate;

const app = express();

app.use(express.static(__dirname+'/index-axios.html'));
app.use(formidable());

app.get('/', (req, res)=>{
	res.sendFile(__dirname+'/index-axios.html');
});

app.post('/', (req, res)=>{
	const myDate = new Date(req.fields.date);
	console.log(JSON.stringify(req.fields));
	console.log('myDate as captures from req.field.date', myDate);
	planets_now();
	var dataJSON = require('./data.json');
    console.log('dataJSON earth longitude:', dataJSON.earth.lon);
	var ealon = dataJSON.earth.lon;
	res.send(JSON.stringify(ealon));
});

app.listen('3000', ()=>{
	console.log('listening to port 3000');

});

