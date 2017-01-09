var express = require('express'),
    sqlite3 = require('sqlite3'),
    router = express.Router();

function openConnection() {
  return new sqlite3.Database('workouts.db');
}

function closeConnection(db) {
  return db.close();
}

router.get('/api/exercises', function(req, res, next) {
  var db = openConnection();
  db.all('SELECT * from EXERCISES', [], function(err, data) {
    db.close();
    if(err) throw err;
    res.send(data);
  });
});

router.get('/api/name-mapping', function(req, res, next) {
  var db = openConnection();
  db.all('SELECT * from NAMEMAPPING', [], function(err, data) {
    db.close();
    if(err) throw err;
    res.send(data);
  });
});

module.exports = router;