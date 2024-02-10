## This API is serving Heliocentric planet coordinates computed for a specific Time of Interest

It uses the [astronomy-bundle](https://github.com/andrmoel/astronomy-bundle-js) package by Andreas Möller. Since it is written in Typescript with ES6 syntax, the use of an ECMA-module loader like [ESM](https://github.com/standard-things/esm) is required (or a transpiler like babel).

This nodeJS app is running on free dynos on Heroku at [https://astro.cgmsim.com](https://astro.cgmsim.com). It doesn't require credentials.  


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