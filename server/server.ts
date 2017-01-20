import express = require('express');
import path = require('path');
import favicon = require('serve-favicon');
import logger = require('morgan';
import cookieParser = require('cookie-parser');
import bodyParser = require('body-parser');
import sqlite3 = require('sqlite3');

var port: number = process.env.PORT || 3000;
var app = express();

app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

var router = express.Router();

var db = new sqlite3.Database('workouts.db');

router.get('/api/exercises', function(req, res, next) {
  db.all('SELECT * from EXERCISES', [], function(err, data) {
    if(err) throw err;
    res.send(data);
  });
});

router.get('/api/exercise/:id', function(req, res, next) {
  var id = req.params.id;
  db.get('SELECT * from EXERCISEINFORMATION where id = ?', [id], function(err, row) {
    if(err) throw err;
    res.send(row || {});
  });
});

router.get('/api/name-mapping', function(req, res, next) {
  db.all('SELECT * from NAMEMAPPING', [], function(err, data) {
    if(err) throw err;
    res.send(data);
  });
});

app.use('/', router);
app.use('/app', express.static(path.resolve(__dirname, 'app')));
app.use('/libs', express.static(path.resolve(__dirname, 'libs')));

// for system.js to work. Can be removed if bundling.
app.use(express.static(path.resolve(__dirname, '.')));
app.use(express.static(path.resolve(__dirname, '../node_modules')));

var renderIndex = (req: express.Request, res: express.Response) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
}

app.get('/*', renderIndex);

var server = app.listen(port, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('This express app is listening on port:' + port);
});