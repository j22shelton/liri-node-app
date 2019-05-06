require("dotenv").config();
debugger;
var keys = require("./keys.js"); 
var spotify = new Spotify(keys.spotify);
var fs = require("fs");
var Spotify = require('node-spotify-api');
var axios = require("axios");
var moment = require("moment");
var functions = require("./functions.js");
var command = process.argv[2];
var query = process.argv.slice(3).join(" ");


if (command === "do-what-it-says") {
	fs.readFile("random.txt", "utf8", function(error, data) {
		if (error) {
			return console.log("Error: " + error);
		}
		var data = data.split(",");
		command = data[0];
		query = data[1];
		userInfo();
	});
} else {
	userInfo();
}

// Function to use user input
function userInfo() {
	if (command === "concert-this") {
		var apiURL = "https://rest.bandsintown.com/artists/" + query + "/events?app_id=codingbootcamp";
        functions.searchConcert(apiURL, query);
        
	} else if (command === "spotify-this-song") {
        var apiURL = "http://www.spotify.com=" + query + "1e20f0a6efed4f46b220cb021386231b";
        functions.searchSong(apiURL, query);
        if(trackQuery === undefined) {
            trackQuery = "Ace of Base, The Sign";
        }
        
	} else if (command === "movie-this") {
        var apiURL = "http://www.omdbapi.com/?t=" + query + "&y=&plot=short&apikey=trilogy";
        functions.searchMovie(apiURL, query);
        if(movieQuery === undefined) {
            movieQuery = "Mr Nobody";
        }
		
	} else {

		// error msg//
		console.log("Info not found.");
	}
}
    //functions to search concert info//
    axios.get(apiURL).then(function(response) {
        var concertInfo = response.data.length;
        if (concertInfo !== 0) {
            
            for (var i = 0; i < concertInfo; i++) {
                var venueName = response.data[i].venue.name;
                var venueLocation = response.data[i].venue.city + ", " + response.data[i].venue.country;
                var dateOfEvent = moment(response.data[i].datetime).format("MM/DD/YYYY");
               
            }
            console.log(results.toString());
            logToFile(results, " concert-this ", query);
        } else {
            console.log("no events found")
        }
    });

    //functions to search Spotify info//
    spotify.search({
        type: 'track',
        query: query,
        limit: limit
    }).then(function(response) {
        var concertInfo = response.tracks.items.length;
        if (concertInfo !== 0) {
          
          
            for (var i = 0; i < concertInfo; i++) {
                var artist = response.tracks.items[i].artists[0].name;
                var song = response.tracks.items[i].name;
                var album = response.tracks.items[i].album.name;
                var released = response.tracks.items[i].album.release_date;
                
            }
            console.log(results.toString());
            logToFile(results, " spotify-this-song ", query);
        } else {
            console.log("Ace of Base, The Sign")
        }
    }).catch(function(err) {
        console.log("Error: " + err);
    });


    //functions to search movie info//
    axios.get(apiURL).then(function(response) {
       
  
        });
        if (response.data.Response !== "False") {
            movieTitle = response.data.Title;
            movieYear = response.data.Year;
            imdbRating = response.data.imdbRating;
            
            if (response.data.Ratings.length >= 2) {
                tomatoesRating = response.data.Ratings[1].Value;
            } else {
                tomatoesRating = "N/A"
            }
            movieCountry = response.data.Country;
            movieLanguage = response.data.Language;
            moviePlot = response.data.Plot;
            movieActors = response.data.Actors;

            console.log(results.toString());
            
        }

