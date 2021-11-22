var FormData = require('form-data');
const fetch = require('node-fetch');
var formdata = new FormData();
formdata.append("date", "2021-11-26T11:34:51.000Z");

var requestOptions = {
  method: 'POST',
  body: formdata,
  redirect: 'follow'
};

fetch("https://astro6.herokuapp.com/", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));