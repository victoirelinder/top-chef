var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){
url ='https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin';
  var listRestau=[];
	// The first parameter is our URL
    // The callback function takes 3 parameters, an error, response status code and the html
 request(url, function(error, response, html){
 	  // First we'll check to make sure no errors occurred when making the request
 	 if(!error){
 	 	var $ = cheerio.load(html);
 	 	    // Finally, we'll define the variables we're going to capture

            var title;
            var json = { title : ""};
             $('.poi_card-display-title').filter(function(){

           // Let's store the data we filter into a variable so we can easily see what's going on.

                var data = $(this);

           // Utilizing jQuery we can easily navigate and get the text by writing the following code:

                title = data.text().trim();

           // Once we have our title, we'll store it to the our json object.

                json.title = title;
		     listRestau.push(json);
        }
        fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

   			 console.log('Done ! - Check your project directory for the output.json file');

		})

		// Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
		res.send('Check your console!')
    })
}
