const { response } = require('express');
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

const api_url = "https://astro6.herokuapp.com/";
async function get_planets(){

  const response = await fetch(api_url, requestOptions); 

  console.log(response);
}
get_planets();


// fetch(api_url, requestOptions)
//   .then(response => response.json())
//   .then(response => {var data = response})
//   .then(response =>{fs.writeFile('./data.json', data, (err) => {
//     if (err) {
//       throw err;
//     }
//     console.log("JSON data is saved.");
//   });

//   })
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));