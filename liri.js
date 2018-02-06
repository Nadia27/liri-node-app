//Read and set any enviroment variable with "dotenv" package
require("dotenv").config(); 

//Include keys.js in file
var keys = require("./keys.js");

console.log(keys);

// fs is a core Node package for reading and writing files
var fs = require("fs"); 

//Include Twitter package 
var Twitter = require('twitter');

//Include Spotify package
var Spotify = require('node-spotify-api');

//Grants access to key information
var spotify = new Spotify(keys.spotify); 
var client = new Twitter(keys.twitter);

//Take command line arguements 
var commands = process.argv[2]; 
var search = process.argv[3]; 



switch(commands) {

	case "my-tweets":
	
	myTweets();

	break; 


	case "spotify-this-song":
	
	spotify(); 
	
	break; 


	case "movie-this":
	
	omdb(); 

	break; 

	case "do-what-it-says":
	
	doSay(); 

	break; 
}

/*
spotify.search({ type: 'track', query: 'dancing in the moonlight' }, function(err, data) {
    
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
 
    console.log(data); 
});
*/

















/*var params = {
	
	count: 2
};

client.get('statuses/home_timeline', params, function(error, tweets, response) {
  

   if (error) {
        console.log(error);

	}
});*/

