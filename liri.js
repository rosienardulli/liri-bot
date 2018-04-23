require("dotenv").config();
    // Node module imports needed to run the functions
	var fs = require("fs"); //reads and writes files
	var request = require("request");
	var keys = require("keys.js");
	var twitter = require("twitter");   //my-tweets
	var spotify = require ("spotify");   //spotify-this-song
	var liriArgument = process.argv[2];
// ---------------------------------------------------------------------------------------------------------------
	// Possible commands for this liri app
	switch(liriArgument) {
		case "my-tweets": myTweets(); break;
		case "spotify-this-song": spotifyThisSong(); break;
		case "movie-this": movieThis(); break;
    };
// ---------------------------------------------------------------------------------------------------------------
// Functions
	// Movie function, uses the Request module to call the OMDB api
	function movieThis(){
		var movie = process.argv[3];
		if(!movie){
			movie = "mr nobody";
		}
		params = movie
		request("http://www.omdbapi.com/?t=" + params + "trilogy", function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var movieObject = JSON.parse(body);
				//console.log(movieObject); // Show the text in the terminal
				var movieResults =
				"------------------------------ begin ------------------------------" + "\r\n"
				"Title: " + movieObject.Title+"\r\n"+
				"Year: " + movieObject.Year+"\r\n"+
				"Imdb Rating: " + movieObject.imdbRating+"\r\n"+
				"Country: " + movieObject.Country+"\r\n"+
				"Language: " + movieObject.Language+"\r\n"+
				"Plot: " + movieObject.Plot+"\r\n"+
				"Actors: " + movieObject.Actors+"\r\n"+
				"Rotten Tomatoes Rating: " + movieObject.tomatoRating+"\r\n"+
				"Rotten Tomatoes URL: " + movieObject.tomatoURL + "\r\n" + 
				"------------------------------ fin ------------------------------" + "\r\n";
				console.log(movieResults);
				log(movieResults); // calling log function
			} else {
				console.log("Error :"+ error);
				return;
			}
		});
	};
	// Tweet function, uses the Twitter module to call the Twitter api
	function myTweets() {
		var client = new twitter({
			TWITTER_CONSUMER_KEY=your-twitter-consumer-key,
            TWITTER_CONSUMER_SECRET=your-twitter-consumer-secret,
            TWITTER_ACCESS_TOKEN_KEY=your-access-token-key,
            TWITTER_ACCESS_TOKEN_SECRET=your-twitter-access-token-secret
		});
		var twitterUsername = process.argv[3];
		if(!twitterUsername){
			twitterUsername = "radio_clash_";
		}
		params = {screen_name: twitterUsername};
		client.get("statuses/user_timeline/", params, function(error, data, response){
			if (!error) {
				for(var i = 0; i < data.length; i++) {
					//console.log(response); // Show the full response in the terminal
					var twitterResults = 
					"@" + data[i].user.screen_name + ": " + 
					data[i].text + "\r\n" + 
					data[i].created_at + "\r\n" + 
					"------------------------------ " + i + " ------------------------------" + "\r\n";
					console.log(twitterResults);
					log(twitterResults); // calling log function
				}
			}  else {
				console.log("Error :"+ error);
				return;
			}
		});
	}
	// Spotify function, uses the Spotify module to call the Spotify api
	function spotifyThisSong(songName) {
		var songName = process.argv[3];
		if(!songName){
			songName = "I Want it That Way";
		}
		params = songName;
		spotify.search({ type: "track", query: params }, function(err, data) {
			if(!err){
				var songInfo = data.tracks.items;
				for (var i = 0; i < 5; i++) {
					if (songInfo[i] != undefined) {
						var spotifyResults =
						"Artist: " + songInfo[i].artists[0].name + "\r\n" +
						"Song: " + songInfo[i].name + "\r\n" +
						"Album the song is from: " + songInfo[i].album.name + "\r\n" +
						"Preview Url: " + songInfo[i].preview_url + "\r\n" + 
						"------------------------------ " + i + " ------------------------------" + "\r\n";
						console.log(spotifyResults);
						log(spotifyResults); // calling log function
					}
				}
			}	else {
				console.log("Error :"+ err);
				return;
			}
		});
	};
	