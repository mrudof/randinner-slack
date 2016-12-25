var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var Yelp = require('yelp');

var yelp = new Yelp({
  consumer_key: process.env.YELP_CONSUMER_KEY,
  consumer_secret: process.env.YELP_CONSUMER_SECRET,
  token: process.env.YELP_TOKEN,
  token_secret: process.env.YELP_TOKEN_SECRET,
});

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.post('/', function (req, res) {
  res.setHeader('Content-Type', 'application/json');

  var slackBody = req.body;
  console.log(slackBody);

  var text = slackBody.text.split(" ");
  var cuisine = text[0];
  var location = text.slice(1,text.length).join(" ");
  var name, url, rating;

  yelp.search({ term: `${cuisine}`, location: `${location}`, sort: '2', limit: '40', radius_filter: '1609.34' })
    .then(function (data) {
    var businesses = data.businesses;
    var rand = businesses[Math.floor(Math.random() * businesses.length)];
    name = rand.name;
    url = rand.url;
    rating = rand.rating;
  })
  .catch(function (err) {
    console.error(err);
  });

  response_json = JSON.stringify({
    "response_type": "in_channel",
    "text": "You want to eat " + cuisine + " in or around the location: " + location
    + "\nWhy not try: " + name + "?" + url
  })

  res.end(response_json);
})

var server = app.listen(process.env.PORT, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
})


