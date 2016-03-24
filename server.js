var express = require('express');
var path = require('path');
var app = express();

var static_path = path.join(__dirname, 'js');
var port = process.env.PORT || 8080;

app.use(express.static(static_path))
  .get('/', function (req, res) {
    res.sendFile('index.html', {
      root: static_path
    });
  }).listen(port, function (err) {
    if (err) { console.log(err) };
    console.log('Listening at localhost: ' + port);
  });
