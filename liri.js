require("dotenv").config();
debugger;
var keys = require("./keys.js"); 
var fs = require("fs");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");
var command = process.argv[2];
var query = process.argv.slice(3).join(" ");
var apiURL 
var inputDetail = process.argv[3];

// Function to use user input

function userInfo() {
	if (command === "concert-this") {
		apiURL = "https://rest.bandsintown.com/artists/" + inputDetail + "/events?app_id=codingbootcamp";
        searchConcert(apiURL, query);
        
	} else if (command === "spotify-this-song") {
        limit = 10;
		if (!inputDetail) {
			inputDetail = "Ace of Base The Sign";
			limit = 1;
		}
        searchSong(inputDetail, limit);

    } else if (command === "movie-this") {
		if (!inputDetail) {
			inputDetail = "Mr. Nobody";
		}
		apiURL = "http://www.omdbapi.com/?t=" + inputDetail + "&y=&plot=short&apikey=trilogy"
		searchMovie(apiURL, inputDetail);

		
	} else {

		// error msg//
		console.log("Info not found.");
	}
}
   function searchConcert() {
    axios.get(apiURL).then(function(response) {

        var concertInfo = response.data.length;
        if (concertInfo !== 0) {

            var result =[]
            for (var i = 0; i < concertInfo; i++) {
                var concert = {
                venueName: response.data[i].venue.name,
                venueLocation: response.data[i].venue.city + ", " + response.data[i].venue.country,
                dateOfEvent: moment(response.data[i].datetime).format("MM/DD/YYYY"),
                }
                result.push(concert)
            }
            console.log(result);
          
        } else {
            console.log("no events found")
        }
    });
   }


    //functions to search Spotify info//
    function searchSong() {
    spotify.search({
        type: 'track',
        query: query,
        limit: 10,
    }).then(function(response) {
        var concertInfo = response.tracks.items.length;
        if (concertInfo !== 0) {
          
            var result =[]
            for (var i = 0; i < concertInfo; i++) {
                var music = {
                artist: response.tracks.items[i].artists[0].name,
                song: response.tracks.items[i].name,
                album: response.tracks.items[i].album.name,
                released: response.tracks.items[i].album.release_date,
                }
                result.push(music)
            }
            console.log(result);
            // logToFile(results, " spotify-this-song ", query);
        } else {
            console.log("Ace of Base, The Sign")
        }
    }).catch(function(err) {
        console.log("Error: " + err);
    });
}

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


    //functions to search movie info//
    function searchMovie() {
    axios.get(apiURL).then(function(response) {
       
  
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

            console.log(movieTitle, movieYear, imdbRating, tomatoesRating, movieCountry, movieLanguage, moviePlot, movieActors);
            
        }
    });
    }