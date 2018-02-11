var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){
url ='https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin';
  // The first parameter is our URL
    // The callback function takes 3 parameters, an error, response status code and the html
 request(url, function(error, response, html){
 	  // First we'll check to make sure no errors occurred when making the request
 	 if(!error){
 	 	var $ = cheerio.load(html);
 	 	    // Finally, we'll define the variables we're going to capture

            var nomdurestau;
            var json = { nomdurestau : ""};
        }
    })
})
