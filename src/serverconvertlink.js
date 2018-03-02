//VICTOIRE LINDER
var cheerio = require('cheerio');
var request = require('request');
var fs = require('fs');

if (fs.existsSync('./list_starred_restau.json')){
  fs.truncate('list_starred_restau.json', 0, function(){
  })
}



var readline = require('readline')

var rl= readline.createInterface({
	input: require('fs').createReadStream('./lien.txt')
});

rl.on('line', function(line){
  request({
    uri: line,
  }, function(error, response, body) {
    if(error) return console.log(error);
    
    var $ = cheerio.load(body);
    var restaurant = {};
    restaurant['name'] = $('.poi_intro-display-title').text().trim();

    var thoroughfare = $('.poi_intro-display-address .field__item .thoroughfare').text();
    var postalcode = $('.poi_intro-display-address .field__item .postal-code').text();
    var locality = $('.poi_intro-display-address .field__item .locality').text();
    var address = {};
    address['thoroughfare'] = thoroughfare;
    address['postalcode'] = postalcode;
    address['locality'] = locality;
    restaurant['address'] =  address;

    
    try{
      fs.appendFileSync("list_starred_restau.json",JSON.stringify(restaurant) + "\n");
    }catch(err){
      console.log(err)
    }

  }).on('error', function(err){console.log(err)}
).end()
});
