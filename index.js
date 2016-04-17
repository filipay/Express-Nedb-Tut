var express = require('express');
var path = require('path');

var app = express();
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

var Datastore = require('nedb'),
    db = new Datastore({filename: 'db/storage.db', autoload: true });

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname,'public'), {
  extensions: ['html']
}));

var server = require('http').createServer(app).listen(process.env.PORT || 8080);

app.post('/store', function (req, res) {
  db.insert(req.body, function (err) {
    if (err) throw err;
  });
  res.sendStatus(200);
});
