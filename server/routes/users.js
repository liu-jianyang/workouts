var express = require('express');
var router = express.Router();

var db = new sqlite3.Database('workouts.db');

router.get('/user/exercises', function(req, res, next) {
  if (req.headers && req.headers.authorization) {
    let token = req.headers.authorization.split(' ')[1];
    if (!token) {
      res.send([]);
    } else {
      try {
        let user = jwt.verify(token, app.get('secret'), { algorithm: 'RS256' });
        db.all('SELECT exercise as id, points from USEREXERCISES where user = $user and points > 0', {$user: user.username}, function(err, data) {
          if(err) throw err;
          res.send(data);
        });
      } catch(err) {
        res.send(err);
      }
    }
  } else {
    res.send([]);
  }  
});

router.post('/user/exercises', function(req, res, next) {
  var exercises = req.body;
  //TODO: Need to update and/or insert
  if (req.headers && req.headers.authorization) {
    let token = req.headers.authorization.split(' ')[1];
    if (!token) {
      res.status(404).send({ error: 'Forbidden to update when there is no user' });
    } else {
      try {
        let user = jwt.verify(token, app.get('secret'), { algorithm: 'RS256' });

        db.serialize(function() {
          db.run('BEGIN TRANSACTION');
          var stmt = db.prepare('INSERT or REPLACE INTO USEREXERCISES (user, exercise, points) values ($user, $exercise, $points)');
          // Three different methods of doing a bulk insert
          for (let i = 0; i < exercises.length; i++) {
            stmt.run({$user: user.username, $exercise: exercises[i].id, $points: exercises[i].points});
            stmt.finalize();
          }
          db.run('COMMIT', [], function(err) {
            if (err) throw err;
            res.send('done');
          });
        });
      } catch(err) {
        res.send(err);
      }
    }
  } else {
    res.send([]);
  }  
});

module.exports = router;
