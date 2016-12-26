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
  var cuisine = text.slice(0,text.length - 1).join(" ");
  var location = text[text.length - 1];
  var name, url, rating;

  yelp.search({ term: `${cuisine}`, location: `${location}`, sort: '2', limit: '40', radius_filter: '3000', category_filter: 'restaurants'})
    .then((data) => {
    var businesses = data.businesses;
    if (businesses.length > 0) {
      var rand = businesses[Math.floor(Math.random() * businesses.length)];
      name = rand.name;
      url = rand.url;
      rating = rand.rating;
      response_json = JSON.stringify({
        "response_type": "in_channel",
        "text": "You want to eat " + cuisine + " in or around the location: " + location  + "\nWhy not try: <"+ url +"|" + name + ">?"
      });
    } else {
      response_json = JSON.stringify({
        "text": "There are no restaurants that meet your criteria."
      })
    };
    res.end(response_json);
  })
  .catch((err) => {
    response_json = JSON.stringify({
      "text": "There was an error."
    })
    res.end(response_json);
  });
})

var server = app.listen(process.env.PORT, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
})


