var express = require('express');
// var request = require('request');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.post('/', function (req, res) {
  // var queryTerm = req.params.query_term;
  res.setHeader('Content-Type', 'application/json');
  // res.end(queryTerm);
  console.log(req.body);
  res.end(req.body);
})


// app.get('/:query_term', function (req, res) {
//   var api_url = "http://api-3283.iheart.com/api/v1/catalog/searchAll?keywords=" + req.params.query_term + "&queryTrack=false&queryBundle=false&queryArtist=true&queryStation=false&queryFeaturedStation=false&queryTalkShow=false&queryTalkTheme=false&queryKeyword=false&countryCode=US"
//   request(api_url, function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//       res.setHeader('Content-Type', 'application/json');
//       res.end(body)
//     }
//   })
// })

var server = app.listen(process.env.PORT, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
})
