var express = require('express'),
    sqlite3 = require('sqlite3'),
    router = express.Router();

var db = new sqlite3.Database('workouts.db');

router.get('/api/exercises', function(req, res, next) {
  db.all('SELECT * from EXERCISES', [], function(err, data) {
    if(err) throw err;
    res.send(data);
  });
});

router.get('/api/exercise/:id', function(req, res, next) {
  var id = req.params.id;
  db.get('SELECT * from EXERCISEINFORMATION where id = $id', {$id: id}, function(err, row) {
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

router.get('/api/loggedin', function(req, res, next) {
  if (req.headers && req.headers.authorization) {
    let token = req.headers.authorization.split(' ')[1];
    if (!token) {
      res.json(false);
    } else {
      try {
        let jwtJson = jwt.verify(token, app.get('secret'), { algorithm: 'RS256' });
        if (moment().format('X') >= jwtJson.exp.toString()) {
          res.json(false);
        } else {
          res.json(true);
        }
      } catch(err) {
        throw err;
      }
    }
  } else {
    res.json(false);
  }
});

module.exports = router;
