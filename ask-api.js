var FormData = require('form-data');
var fetch = require('node-fetch');
var formdata = new FormData();
var myDate = new Date();
var dateString = myDate.toISOString();
console.log("date", myDate, 'dateString', dateString);
formdata.append("date", dateString);

var requestOptions = {
  method: 'POST',
  body: formdata,
  redirect: 'follow'
};

fetch("https://astro6.herokuapp.com/", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));