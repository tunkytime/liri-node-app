// INSTALL AND REQUIRE PACKAGES
require("dotenv").config();
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var spotify = new Spotify(keys.spotify);

// SETUP VARIABLES
var limit = 5;
var input = process.argv;
var search = process.argv[3];
var command = input[2];

for (var i = 4; i < input.length; i++) {
  search = search + " " + input[i];
};

// MAIN PROCESS
switch (command) {
  case 'concert-this':
    concertThis(search);
    break;
  case 'spotify-this-song':
    spotifyThis(search);
    break;
  case 'movie-this':
    movieThis(search);
    break;
  case 'do-what-it-says':
    doThis();
    break;
  default:
    console.log("Sorry, that didn't work!");
}

// FUNCTIONS
function concertThis(search) {
  if (search === undefined) {
    console.log('Please search for an artist or band.')
  } else {
    axios
      .get(
        `https://rest.bandsintown.com/artists/${search}/events?app_id=codingbootcamp`
      )
      .then(function (res) {
        console.log("=======================================");
        console.log("NEXT THREE EVENTS");
        console.log("=======================================");
        var data = res.data;
        for (var i = 0; i < 3; i++) {
          var name = data[i].venue.name;
          var city = data[i].venue.city;
          var country = data[i].venue.country;
          var date = moment(data[i].datetime).format("LL");
          var nextEvents = {
            Venue: name,
            Location: `${city} ${country}`,
            Date: date
          };
          console.log(nextEvents);
        }
      })
      .catch(function (err) {
        console.log(err);
        console.log('Please search a different artist or band.')
      });
  }
};

function spotifyThis(search) {
  if (search === undefined) {
    search = "The Sign Ace of Base";
    limit = 1;
  }
  spotify
    .search({
      type: "track",
      query: search,
      limit: limit
    })
    .then(function (response) {
      console.log(search);
      console.log("=======================================");
      console.log("TOP FIVE RESULTS");
      console.log("=======================================");
      var res = response.tracks.items;
      for (var i = 0; i < res.length; i++) {
        var artist = res[i].album.artists[0].name;
        var album = res[i].album.name;
        var song = res[i].name;
        var preview = res[i].preview_url;
        var searchResult = {
          Artist: artist,
          Album: album,
          Song: song,
          Preview: preview
        };
        console.log(searchResult);
        console.log("=======================================");
      }
    })
    .catch(function (err) {
      console.long(err);
    });
};

function movieThis(search) {
  if (search === undefined) {
    search = "Mr. Nobody";
  }
  axios({
      method: 'get',
      url: `http://www.omdbapi.com/?apikey=trilogy&t=${search}`,
    })
    .then(function (res) {
      console.log("=======================================");
      console.log("ABOUT THIS MOVIE");
      console.log("=======================================");
      var r = res.data;
      var movieResult = {
        Title: r.Title,
        Year: r.Year,
        Rated: r.Rated,
        IMDB: r.Ratings[0].Value,
        RottenTomatoes: r.Ratings[1].Value,
        Country: r.Country,
        Language: r.Language,
        Plot: r.Plot,
        Actors: r.Actors
      }
      console.log(movieResult);
    })
    .catch(function (err) {
      console.log(err);
    });
};

function doThis() {
  fs.readFile("random.txt", "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    var dataArr = data.split(",");
    console.log(dataArr);
    var searchType = dataArr[0];
    search = dataArr[1];
    search = search.substr(1).slice(0, -1);
    if (searchType == 'spotify-this-song') {
      spotifyThis(search);
    } else if (searchType == 'concert-this') {
      concertThis(search);
    } else if (searchType == 'movie-this') {
      movieThis(search);
    } else {
      console.log('No data to read');
    }
  })
}