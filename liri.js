//Read and set any enviroment variable with "dotenv" package
require("dotenv").config(); 

//Include keys.js in file
var keys = require('./keys.js');

//Grants access to to key information
var spotify = new Spotify(keys.spotify); 
var client = new Twitter(keys.twitter); 


