//set environment variables with the dotenv package
require("dotenv").config();

// import keys.js and other packages
let keys = require('./keys.js');
let Twitter = require('twitter');
let request = require('request-promise');
let Spotify = require('node-spotify-api');
let fs = require('fs-extra');
let omdb = require('omdb');
let command = process.argv[2];



// access key info
let spotify = new Spotify(keys.spotify);
let client = new Twitter(keys.Twitter);

switch (command) {
    case "myTweets":
        myTweets();
        break;

    case "spotifySong":
        spotifySong();
        break;

    case "movieThis":
        movieThis();
        break;

    case "whatever":
        whatever();
        break;
}

function myTweets() {
    console.log('do it');
    let params = {
        screen_name: 'NoKicktheBaby',
        count: 20
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                let tweet = tweets[i].text;
                let time = tweets[i].created_at;
                console.log('"' + tweet + '"');
                console.log(time);
                console.log("");
            }

        }
    });
}

function spotifySong() {}

function movieThis() {
    var title = process.argv.slice(3).join("+");
    console.log(title);
    if (!title) {
        request("http://www.omdbapi.com/?t=" + "Mr+Nobody" + "&y=&plot=short&apikey=trilogy")
            .then(response => {
                let data = JSON.parse(response);
                console.log("Movie Title: " + data.Title);
                console.log("Year Released: " + data.Year);
                console.log("IMBD Rating: " + data.imdbRating);
                console.log(data.Ratings[1]);
                console.log("Country produced in: " + data.Country);
                console.log("Movie Language: " + data.Language);
                console.log("Plot: " + data.Plot);
                console.log("Actors: " + data.Actors);
            });
    } else {
        request("http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy")
            .then(response => {
                let data = JSON.parse(response);
                console.log("Movie Title: " + data.Title);
                console.log("Year Released: " + data.Year);
                console.log("IMBD Rating: " + data.imdbRating);
                console.log(data.Ratings[1]);
                console.log("Country produced in: " + data.Country);
                console.log("Movie Language: " + data.Language);
                console.log("Plot: " + data.Plot);
                console.log("Actors: " + data.Actors);
            });
    };
}



function whatever() {
    fs.readFile("random.txt", "utf8", (error, data) => {
        if (error) {
            saveOutput(`Error in calling "Do What It Says":\n${error}\n\n\n`);
            return;
        }

      
        const commands = data.split(os.EOL);
        

        if (commands.length === 1 && commands[0] === "") {
            saveOutput(`Error in calling "Do What It Says":\nPlease enter a command in "random.txt".\n\n\n`);
        }

        commands.forEach(c => {
            if (c === "") {
                return;
            }

            const index = c.indexOf(",");

            const option = (index >= 0) ? c.substring(0,  index).trim().toLowerCase() : c;
            const title  = (index >= 0) ? c.substring(index + 1).trim()               : undefined;

            mainMenu(option, title);
        });
    });
}

function addSeparator() {
    return "-".repeat(60) + "\n\n";
}


function saveOutput(output) {
    
    console.log(output);

  
    fs.appendFile(file_log, output, error => {
        if (error) {
            return console.log(`Error in appending to "${file_log}"\n${error}\n\n\n`);
        }
    });
}