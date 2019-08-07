require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var inquirer = require("inquirer");
var moment = require('moment');
let dashes = "========================================================";
let searchResult ="============================================================== YOUR SEARCH RESULTS: ======================================================================================";

//Concert Bands in Town
function callBands(artistName){
    if (!artistName) {
        artistName = "Shawn Mendes";
    }
    let queryURL = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp";
    axios.get(queryURL).then(function(response){
        let res = response.data[0];
        result = searchResult + "\n"
        + "Name of the venue: "+ res.venue.name + "\n" 
        + "Venue location: " + res.venue.city + "\n"
        + "Date and time of the Event: " + moment(res.datetime).format("LLL") + "\n"
        + dashes + dashes + dashes + "\n";
        console.log(result); 
        writeFile(result);
    })
    .catch(function(error) {
        if (error.response) {
          console.log(error);
        } 
      });
};
//Spotify api
function callSpotify(songName) {
    // default song is `old town road`
    if (!songName) {
        songName = "Old Town Road";
    }
    spotify.search({ type: "track", query: songName }, function(error, data) {
        if (error) {
            return console.log("Error occurred: " + error);
        }
        let res = data.tracks.items[0];
            result = searchResult + "\n"
            + "Song: " + res.name + "\n"	
			+ "Artist: " + res.artists[0].name + "\n"
			+ "Album: " + res.album.name + "\n"
            + "Spotify link: " + res.external_urls.spotify + "\n"
            + "Preview URL: " + res.preview_url
            + dashes + dashes + dashes + "\n";
            console.log(result);
            writeFile(result);
    });
}

//Movie API OMDB
let callOMDB = function(movieName) {

    if (!movieName) {
        movieName = "Forrest Gump";
    }
    let queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    axios.get(queryURL).then(function(response){
        let res = response.data;
        result = searchResult + "\n"
        + "Title of the movie: "+ res.Title + "\n" 
        + "Year the movie came out: " + res.Year + "\n"
        + "IMDB Rating of the movie: " + res.imdbRating + "\n"
        + "Metascore Rating of the movie: " + res.Metascore + "\n"
        + "Country where the movie was produced: " + res.Country + "\n"
        + "Language of the movie: " + res.Language + "\n"
        + "Plot of the movie: "+ res.Plot + "\n"
        + "Actors in the movie: "+ res.Actors + "\n"
        +dashes + dashes + dashes + "\n";
        console.log(result);
        writeFile(result);

    })
    .catch(function(error) {
        console.log("Error occurred: "+ error);
      });
};

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
          }
        callSpotify(data);
    });
}

// Function to log data in File
function writeFile(data){
    fs.appendFile("log.txt", data, "utf8",function(error){
        if (error) throw error;
            console.log("log.txt was updated!");
    })
}
let question = [{
        type: "list",
        name: "function",
        message: "Please make a selection from below:-",
        choices: ["Concert","Spotify", "Movie","Do what it says"]
    },
    {
        type: "input",
        name: "concert",
        message: "Please type the concert/artist name you would like to search?",
        when: function(options) {
            return options.function == "Concert";
        }
    },
    {
        type: "input",
        name: "movie",
        message: "Please type the movie you would like to search?",
        when: function(options) {
            return options.function == "Movie";
        }
    },
    {
        type: "input",
        name: "song",
        message: "Please type the song  name you would like to search?",
        when: function(options) {
            return options.function == "Spotify";
        }
    },
];

inquirer
    .prompt(question)
    .then(options => {
        switch (options.function) {
            case "Concert":
                callBands(options.concert);
                break;
            case "Spotify":
                callSpotify(options.song);
                break;
            case "Movie":
                callOMDB(options.movie);
                break;
            case "Do what it says":
                doWhatItSays();
                break;
            default:
                console.log("INVALID REQUEST. PLEASE RETRY!");
        }
    });