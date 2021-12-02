var FormData = require("form-data");
const { writeFile } = require("fs/promises");
var fetch = require("node-fetch");
var formdata = new FormData();
var myDate = new Date();
var dateString = myDate.toISOString();
console.log("date", myDate, "dateString", dateString);
formdata.append("date", dateString);

var requestOptions = {
  method: "POST",
  body: formdata,
  redirect: "follow",
};

async function fetchText() {
  let response = await fetch("https://astro6.herokuapp.com/", requestOptions);
  let data = await response.json();
  const dataJSON = JSON.stringify(data, null, 4);

  const dataArray = Object.entries(data);
  dataArray.forEach(([key, value]) => {
    console.log(key); // 'one'
    console.log(value); // 1
  });
  const arrayJSON = JSON.stringify(dataArray, null, 4);

  
  await writeFile("./data-local.json", dataJSON);
  await writeFile("./data-array.json", arrayJSON);
  console.log(data);
  //console.log(dataArray);
  //console.log('dataArray[14]:',dataArray[14]);
}
fetchText();
