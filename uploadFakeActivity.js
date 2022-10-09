const dotenv = require('dotenv');
var result = require('dotenv').config();

var moment = require('moment');
const fetch = require('node-fetch');

const api_url = process.env.API_URL;
const api_secret = process.env.API_SECRET;


module.exports = function run() {

    const date = Date.now();

    let steps = Math.round(Math.random() * 300);
    console.log(steps);

    var stepsToUpload = {
    created_at : moment(date).toISOString(),
    steps : steps,
    secret: api_secret
    } ;
    console.log(stepsToUpload);

    let heartRate =  Math.round(50 + Math.random() * 50);   
    console.log(heartRate);

    var heartRateToUpload = {
    created_at : moment(date).toISOString(),
    heartRate: heartRate,
    secret: api_secret
    } ;
    console.log(heartRateToUpload);

    fetch(api_url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(stepsToUpload), 
    });

    fetch(api_url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(heartRateToUpload), 
    });
};