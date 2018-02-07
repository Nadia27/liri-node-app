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




//Search spotify for a song
function searchSpotify() {

	inquirer.prompt({

		name:'song', 

		//Question to user
		message: 'What is the song title?'
	
	}).then(function(answer) {

		var song = answer.song; 

		spotify.search({ type: 'track', query: song, limit: 1 }, function(err, data) {
  
  			if (err) {
    
    			return console.log('Error occurred: ' + err);
  			}
 

			var tracks = data.tracks.items;

		
			//console.log(tracks); 

			for (var i = 0; i < tracks.length; i++) {
	
				console.log(tracks.album.artists[0].name + "Song Name: " + tracks[i].name + '\n' + "Album Name: " + tracks[i].album.name + '\n' + "Preview Url: " + tracks[i].preview_url + '\n'); 
		

			};



		});


	});
	
}



//Prompt user to select a command at initial 
function getCommand() {
	
	inquirer.prompt({
		
		name: 'command',
		
		type: 'rawlist',
		
		//Question asking to user
		message: 'What command would you like to run?',
		
		choices: ['Search spotify for a song','Show my Tweets', 'Search a movie', 'Do what it says']
	
	}).then(function(answer) {

		//console.log(answer);
			
		var command = answer.command;

		switch(command) {
			
			case 'Search spotify for a song':
				
				searchSpotify();
				
				break;
			
			case 'my-tweets':
				
				tweets();

				break;
				
				//getCommand();
		}
	});
}


// Ask the user which command they want to run initially
getCommand(); 

















var params = {

	screen_name: 'jonesnadial1', 
	count: 20
};

function tweets() {

client.get('statuses/user_timeline', params, function(error, tweets, response) {
  
  if (!error) {
    
    console.log(tweets);
  }

});

}


















