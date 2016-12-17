var express = require('express');
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
  res.setHeader('Content-Type', 'application/json');

  var slackBody = req.body;
  console.log(slackBody);

  var text = slackBody.text.split(" ");
  var cuisine = text[0];
  var location = text.slice(1,text.length).join(" ");

  response_json = JSON.stringify({
    "response_type": "in_channel",
    "text": "You want to eat " + cuisine + " in or around the location: " + location
  })

  res.end(response_json);
})

var server = app.listen(process.env.PORT, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
})
