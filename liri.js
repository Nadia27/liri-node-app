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

			var musician;

			for (musician in tracks) {

				//console.log(tracks[musician].artists[0].name);
			}

			for (var i = 0; i < tracks.length; i++) {

				console.log("-------------------------------------------------------------------");
    			console.log("-------------------------------------------------------------------");

	
				console.log("Artist(s): " + tracks[musician].artists[0].name + '\n' 

							+ "Song Name: " + tracks[i].name + '\n' 

							+ "Album Name: " + tracks[i].album.name + '\n' 

							+ "Preview Url: " + tracks[i].preview_url + '\n');

				console.log("-------------------------------------------------------------------");
    			 console.log("-------------------------------------------------------------------");
 
		

			};



		});


	});
	
}


function tweets() {

	inquirer.prompt({

		name:'my-tweets', 

		//Question to user
		message: 'What is your twitter screen name?'
	
	}).then(function(answer) {

		console.log(answer); 
		
		var params = {

			screen_name: 'jonesnadial1', 
	
			count: 20
		};



		client.get('statuses/user_timeline', params, function(error, tweet, response) {
  
 			if (!error) {
    
    			//console.log(tweet);

    			//var info = tweet;



    			var posts;

    			for (posts in tweet) {

    				console.log("-------------------------------------------------------------------");
    				
    				console.log(tweet[posts].text);

    				console.log("-------------------------------------------------------------------");
    				


				};
  		
  			};

		});


	});

}


function ombd() {

	inquirer.prompt({

		name:'movie', 

		//Question to user
		message: 'What moveie would you like to search?'
	
	}).then(function(answer) {

		//console.log(answer); 

		var flick = answer.movie;
    			

		if(flick === "") {

			request("http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=40e9cece", function(error, response, body) {


    			var location =  JSON.parse(body);
  
  				// If the request is successful = 200
  			
  				if (!error && response.statusCode === 200) {

    			// Parse the body of the site and recover info
    
					console.log("-------------------------------------------------------------------");
    				console.log("-------------------------------------------------------------------");

    				console.log("Movie title: " + location.Title + '\n' 

   				 			+ "Year released: " + location.Year + '\n'

   				 			+ "IMBD rating is: " + location.imdbRating + '\n'

   				 			+ "Rotten Tomatoes rating is: " + location.Ratings[1].Source,location.Ratings[1].Value + '\n' 

   				 			+ "Production country: " + location.Country + '\n'

   				 			+ "Language: " + location.Language + '\n' 

   				 			+ "Movie plot: " + location.Plot + '\n' 

   				 			+ "Actors: " + location.Actors + '\n');

    				console.log("-------------------------------------------------------------------");
    				console.log("-------------------------------------------------------------------");

  				};
			
			});

		} else {

			request("http://www.omdbapi.com/?t=" + flick + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {

				var location =  JSON.parse(body);

  				// If the request is successful=200
  
  				if (!error && response.statusCode === 200) {

    		    	//console.log(JSON.parse(body));


    				console.log("-------------------------------------------------------------------");
    				console.log("-------------------------------------------------------------------");

   				
   					console.log("Movie title: " + location.Title + '\n' 

   				 			+ "Year released: " + location.Year + '\n'

   				 			+ "IMBD rating is: " + location.imdbRating + '\n'

   				 			+ "Rotten Tomatoes rating is: " + location.Ratings[1].Source,location.Ratings[1].Value + '\n' 

   				 			+ "Production country: " + location.Country + '\n'

   				 			+ "Language: " + location.Language + '\n' 

   				 			+ "Movie plot: " + location.Plot + '\n' 

   				 			+ "Actors: " + location.Actors + '\n');

  					console.log("-------------------------------------------------------------------");
  					console.log("-------------------------------------------------------------------");
		
  				};
		
			});
				
		};
	
	});

}


function doSay() {

	// This block of code will read from the "random.txt" file.
	// It's important to include the "utf8" parameter 
	// will store the contents of the reading inside the variable "data"
	fs.readFile("random.txt", "utf8", function(error, data) {

  	// If the code experiences any errors it will log the error to the console.
  	if (error) {
    
    	return console.log(error);
  	}

  	// We will then print the contents of data
  	console.log(data);

 	 //var text = data.substring();

 	 var sep = data.substr(0, 17);

 	 var sep2 = data.substr(19, 28);

 	 	console.log(sep);

 	 /*	var argv1 = process.argv[2]; */

 	 	console.log(sep2);

 	 	
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
			
			case 'Show my Tweets':
				

				tweets();

				break;
				
			case 'Search a movie':

			ombd(); 

			break; 

			case 'Do what it says':

			doSay();

			break;
		}
	});
}


// Ask the user which command they want to run initially
getCommand(); 



































