# liri-node-app

This is a Node.js app that depends on user input from the command line.

It integrates various APIs via the appropriate NPM modules and uses API calls to parse through returned JSON objects, 
outputting them in a specific format.


Technologies Used:
Node.js
JavaScript
Bands in Town API 
Spotify API 
OMDb API 

Code Explanation
Authentication keys are stored in "keys.js", exported to "liri.js" file.

What this app does depends on what the user types. 

The app prints: (1) info about band events, (2) Spotify lookup for a song, (3) OMDb lookup for a movie, and (4) read command and query from another file.

The program makes a request to the Bands in Town Artist Events API that is limited by parameters -- name of venue, venue location, and date, and we get back a JSON object that includes an array of info; from there, we selectively output using console.log

The program also makes a request to the Spotify API, and we get back a JSON object that includes everything we need (artist(s), song, preview link, and album)

The program also makes a HTTP request to the OMDb API using the request NPM module, and we get back a JSON object that includes everything we need (title, year, IMDb rating, language, etc.)

The program also reads from a file called "random.text" and executes the command found there.

![SpotifyImage](spotify.png)