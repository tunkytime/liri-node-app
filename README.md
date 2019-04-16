# liri-node-app

Liri is a command line application that runs using node.js. This app makes it easy to find data for concerts, songs, and movies.

## Concert Search 
Search the Bands in Town Artist Events API to return the following event information about a band or artist:

* Venue
* Location
* Date

### Parameters
* 'concert-this'
* band or artist name

*Currently set to return next three events*

![Concert](/screenshots/concert-this.png)

## Song Search
Search the Spotify API to return the following information about a song:
* Artist(s)
* Album
* Song title
* Preview link of the song

### Parameters
* 'spotify-this-song'
* song name (if this is empty, the search defaults to The Sign by Ace of Base)

*Currently set to return five results*

![Spotify](/screenshots/spotify-this.png)

## Movie Search
Search the OMDB API to return the following informaiton about a movie:
* Title
* Year
* Rating
* Rotten Tomatoes Rating
* IMDB Rating
* Production country or countries
* Language(s)
* Plot

### Parameters
* 'movie-this'
* movie name (if this is empty, the search defaults to Mr. Nobody)

*Returns one result*

![Movie](/screenshots/movie-this.png)

## Search from Text File
Reads the text in the random.txt file and performs whatever action is listed
The text file contains the text - concert-this,"Imagine Dragons" - and searches the Bands in Town Artist Events API.
The text file can be changed to search the Spotify and OMDB API, as well.

![Text](/screenshots/do-what-it-says.png)

## No Parameters
If no parameters are included, the following message is logged:
![Error](/screenshots/no-results.png)
