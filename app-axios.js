const express = require('express');
const formidable = require('express-formidable');

const app = express();

app.use(express.static(__dirname+'/index-axios.html'));
app.use(formidable());

app.get('/', (req, res)=>{
	res.sendFile(__dirname+'/index-axios.html');
});

app.post('/', (req, res)=>{
	res.send(JSON.stringify(req.fields));
	console.log(JSON.stringify(req.fields));
});

app.listen('3000', ()=>{
	console.log('listening to port 3000');

});
