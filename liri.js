//Read and set any enviroment variable with "dotenv" package
require("dotenv").config(); 

//Include keys.js in file
var keys = require("./keys.js");

// fs is a core Node package for reading and writing files
var fs = require("fs"); 

// Include the inquirer npm package 
var inquirer = require('inquirer');

// Include the request npm package 
var request = require("request");

//Include Twitter package 
var Twitter = require('twitter');

//Include Spotify package
var Spotify = require('node-spotify-api');

//Grants access to key information
var spotify = new Spotify(keys.spotify); 
var client = new Twitter(keys.twitter);

//Take command line arguements 
//var commands = process.argv[2]; 
var search = process.argv[3]; 



//Search spotify for a song
function spotify() {

	inquirer.prompt({

		name:'song', 

		message: 'What is the song title?'
	
	}).then(function(answer) {

		console.log(answer);
		
	});
	
}



//Prompt user to select a command at initial load
function getCommand() {
	
	inquirer.prompt({
		
		name: 'command',
		
		type: 'rawlist',
		
		message: 'What command would you like to run?',
		
		choices: ['Search spotify for a song','Show my Tweets', 'Search a movie', 'Do what it says']
	
	}).then(function(answer) {

		console.log(answer);
		
		var command = answer.command;

		switch(command) {
			
			case 'Search spotify for a song':
				
				spotify();
				
				break;
			
			case 'my-tweets':
				
				tweet();

				break;
				
				//getCommand();
		}
	});
}

getCommand(); // Ask the user which command they want to run initially












/*

if (commands == "spotify-this-song") {

	//console.log("MUSIC IS LIFE!"); 

	spotify.search({ type: 'track', query: search, limit: 1 }, function(err, data) {
  
  		if (err) {
    
    		return console.log('Error occurred: ' + err);
  		}
 

		var tracks = data.tracks.items;

		
		console.log(tracks); 

		for (var i = 0; i < tracks.length; i++) {
	
			console.log(tracks.album.artists[0].name + "Song Name: " + tracks[i].name + '\n' + "Album Name: " + tracks[i].album.name + '\n' + "Preview Url: " + tracks[i].preview_url + '\n'); 
		

		};



	});

}
*/




/*var params = {

	screen_name: 'jonesnadial1', 
	count: 20
};

function myTweets() {

client.get('statuses/user_timeline', params, function(error, tweets, response) {
  
  if (!error) {
    
    console.log(tweets);
  }

});

}
*/

















