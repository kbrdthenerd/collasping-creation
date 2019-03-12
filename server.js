var express = require('express');
var app = express();
var server = require('http').Server(app);
const PORT = process.env.PORT || 8081

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

server.listen(PORT, function () {
  console.log(`Listening on ${server.address().port}`);
});
