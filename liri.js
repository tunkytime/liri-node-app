require("dotenv").config();
var axios = require("axios");
var moment = require("moment");
var keys = require("./keys.js");
var spotify = keys.spotify;

var input = process.argv;

// 1. `node liri.js concert-this <artist/band name here>`
var artist = input[2]

axios.get(`https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`).then(
    function (response) {
        var data = response.data
        for (var i = 0; i < data.length; i++) {
            var name = data[i].venue.name;
            var city = data[i].venue.city;
            var country = data[i].venue.country;
            var date = moment(data[i].datetime).format('LL');
            console.log(`Venue: ${name}`);
            console.log(`Location: ${city}, ${country}`);
            console.log(`Event Date: ${date}`);
        }
    }
);