## This API is serving Heliocentric planet coordinates computed for a specific Time of Interest

It uses the [astronomy-bundle](https://github.com/andrmoel/astronomy-bundle-js) package by Andreas Möller. Since it is written in Typescript with ES6 syntax, the use of a transpiler like [ESM](https://github.com/standard-things/esm) is required.

This nodeJS app is running on free dynos on Heroku at [https://astro6.herokuapp.com](https://astro6.herokuapp.com). It doesn't require credentials.  


## Running locally  

To run your own instalment of the app, type in terminal:
```
npm start 
```
OR
```
node -r esm app-axios.js
```
Your HTML interface is [running on port 3000](http://localhost:3000/)  



## Querying the API from another 
When the app is running, POST requests can be sent to the API as in the [example included here](https://github.com/lsandini/astro/blob/main/ask-api.js).