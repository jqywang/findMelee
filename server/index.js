var express = require('express');
var bodyParser = require('body-parser');
var items = require('../database-mongo');
const cors = require('cors');
var app = express();

// UNCOMMENT FOR REACT
app.use(cors());
app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/listings', (req, res) => {
  console.log(req.query.location);
  res.send([1, 2, 3, 4, 5]);
})

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

