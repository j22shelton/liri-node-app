//loads exports from keys.js//
var keys = require("./keys.js");

var banksInTownCredentials = keys.bandsInTownKeys;
var command = process.argv[2];
var query = process.argv[3];

// Functions //
var bandInfo = function() {

	// Load from npm
	var Bands = require('bands');

	// From exports of keys.js file
	var client = new Bands({
		consumer_key: banksInTownCredentials.consumer_key,
		consumer_secret: banksInTownCredentials.consumer_secret,
	});

	  	for(var i = 0; i < bands.length; i++) {
	  		console.log("( #" + (i + 1) + " )  " + bands[i].text);
	  		console.log("Created:  " + bands[i].created_at);
	  		console.log("");
	  	}
	  }
	});
}


//Spotify functionality//
var spotifyThisSong = function(trackQuery) {

    //npm package//
    var spotify = require('spotify');

    //default song if no user input exists//
    if(trackQuery === undefined) {
		trackQuery = "the sign ace of base";
	}

	// Spotify API request//
	spotify.search({ type: 'track', query: trackQuery }, function(error, data) {
	    if(error) { 
	        console.log('Error occurred: ' + error);
	    } else { 

	    	// For loop is for when a track has multiple artists
				for(var i = 0; i < data.tracks.items[0].artists.length; i++) {
					if(i === 0) {
						console.log("Artist(s):    " + data.tracks.items[0].artists[i].name);
					} else {
						console.log("              " + data.tracks.items[0].artists[i].name);
					}
				}
				console.log("Song:         " + data.tracks.items[0].name);
				console.log("Preview Link: " + data.tracks.items[0].preview_url);
				console.log("Album:        " + data.tracks.items[0].album.name);
	    }
	 
	 		
	});
}

var movieThis = function(movieQuery) {

	// Load request npm module
	var request = require("request");

	// default movie if no input exists//
	if(movieQuery === undefined) {
		movieQuery = "mr nobody";
	}

	// HTTP GET request//
	request("http://www.omdbapi.com/?t=" + movieQuery + "&y=&plot=short&r=json", function(error, response, body) {
	  if (!error && response.statusCode === 200) {
	    console.log("* Title of the movie:         " + JSON.parse(body).Title);
	    console.log("* Year the movie came out:    " + JSON.parse(body).Year);
        console.log("* IMDB Rating of the movie:   " + JSON.parse(body).imdbRating);
        console.log("* Rotten Tomatoes Rating:     " + JSON.parse(body).rtRating);
	    console.log("* Country produced:           " + JSON.parse(body).Country);
	    console.log("* Language of the movie:      " + JSON.parse(body).Language);
	    console.log("* Plot of the movie:          " + JSON.parse(body).Plot);
	    console.log("* Actors in the movie:        " + JSON.parse(body).Actors);

	    // For loop runs through Ratings//
	    // Prints ratings if found//
	    for(var i = 0; i < JSON.parse(body).Ratings.length; i++) {
	    	if(JSON.parse(body).Ratings[i].Source === "Rotten Tomatoes") {
	    		console.log("* Rotten Tomatoes Rating:     " + JSON.parse(body).Ratings[i].Value);
	    		if(JSON.parse(body).Ratings[i].Website !== undefined) {
	    			console.log("* Rotten Tomatoes URL:        " + JSON.parse(body).Ratings[i].Website);
	    		}
	    	}
	    }
	  }
	});
}
// impact of user input on app 
if(command === "concert-this") {
	concertThis();
} else if(command === "spotify-this-song") {
	spotifyThisSong(query);
} else if(command === "movie-this") {
	movieThis(query);
} else if(command === "do-what-it-says") {
    
    
    // impact of file read / loads fs npm package on app //
	var fs = require("fs");

	fs.readFile("random.txt", "utf-8", function(error, data) {
		var command;
		var query;

		// if comma, then split string to differentiate between command and query//
		// if no comma, only command taken into account //
		if(data.indexOf(",") !== -1) {
			var dataArr = data.split(",");
			command = dataArr[0];
			query = dataArr[1];
		} else {
			command = data;
		}

		// app runs based on command//
		if(command === "concert-this") {
			concertThis(query);
		} else if(command === "spotify-this-song") {
			spotifyThisSong(query);
		} else if(command === "movie-this") {
			movieThis(query);
		} else { 
			console.log("Not a valid command! Please try again.")
		}
    });

//if no command given//
} else if(command === undefined) { 
    console.log("Please enter a command to run LIRI.")

//else if command given and not recognized//
} else { 
	console.log("Command not recognized! Try again.")
}
