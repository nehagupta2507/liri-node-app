require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var inquirer = require("inquirer");
let dashes = "========================================================";
let searchResult ="============================================================== YOUR SEARCH RESULTS: ======================================================================================";

//Spotify api
function callSpotify(songName) {
    // default song is `old town road`
    if (!songName) {
        songName = "Old Town Road";
    }
    spotify.search({ type: "track", query: songName }, function(error, data) {
        if (error) {
            console.log("Error occurred: " + error);
            return;
        } else {
            console.log(JSON.stringify(data));
        }
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
        // console.log(res.Title + res.Year);
        result = searchResult + "\n"
        + "Title of the movie: "+ res.Title + "\n" 
        + "Year the movie came out: " + res.Year + "\n"
        + "IMDB Rating of the movie: " + res.imdbRating + "\n"
        + "Metascore Rating of the movie: " + res.Metascore + "\n"
        + "Country where the movie was produced: " + res.Country + "\n"
        + "Language of the movie: " + res.Language + "\n"
        + "Plot of the movie: "+ res.Plot + "\n"
        + "Actors in the movie: "+ res.Actors + "\n"
        +dashes + dashes + dashes + "\n"
        console.log(result);
    })
    .catch(function(error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log("---------------Data---------------");
          console.log(error.response.data);
          console.log("---------------Status---------------");
          console.log(error.response.status);
          console.log("---------------Status---------------");
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an object that comes back with details pertaining to the error that occurred.
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
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

let question = [{
        type: "list",
        name: "functions",
        message: "Please make a selection from below:-",
        choices: ["Spotify", "Movie","Do what it says"]
    },
    {
        type: "input",
        name: "movieName",
        message: "Please type the movie you would like to search?",
        when: function(options) {
            return options.functions == "Movie";
        }
    },
    {
        type: "input",
        name: "songName",
        message: "Please type the movie you would like to search?",
        when: function(options) {
            return options.functions == "Spotify";
        }
    },
];

inquirer
    .prompt(question)
    .then(options => {
        switch (options.functions) {
            case "Spotify":
                callSpotify(options.songName);
                break;
            case "Movie":
                callOMDB(options.movieName);
                break;
            case "Do what it says":
                doWhatItSays();
                break;
            default:
                console.log(`LIRI doesn"t know that`);
        }
    });