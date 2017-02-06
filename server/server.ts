import express = require('express');
import path = require('path');
import favicon = require('serve-favicon');
import logger = require('morgan';
import cookieParser = require('cookie-parser');
import bodyParser = require('body-parser');
import sqlite3 = require('sqlite3');
import Q = require('q');
import bcrypt = require('bcryptjs');
import methodOverride = require('method-override');
import session = require('express-session');
import passport = require('passport');
import LocalStrategy = require('passport-local');
import jwt = require('jsonwebtoken');
import fs = require('fs');
import path = require('path');

var port: number = process.env.PORT || 3000;
var app = express();

var db = new sqlite3.Database('workouts.db');
var secret = 'Jj3A2n2YoPQwSWRx';
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})

app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use(logger('dev', {stream: accessLogStream}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(session({secret: 'supernova', saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());
app.set('secret', secret);

//===============PASSPORT=================
// Passport session setup.
passport.serializeUser(function(user, done) {
  console.log("serializing " + user.username);
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  console.log("deserializing " + obj.username);
  done(null, obj);
});

function signUsername(username) {
  var token = jwt.sign({username: username}, app.get('secret'), {
      expiresIn: '30 days' // expires in 30 days
    }, { algorithm: 'RS256' });
  // return the information including token as JSON
  return {
    username: username,
    token: token
  });
}
function localAuth(username, password) {
  var deferred = Q.defer();
  db.get('SELECT * from USERS where username = $username', {$username: username}, function(err, result) {
    if (err) deferred.reject(err);
    if (result === undefined) {
      console.log('Username not found:', username);
      deferred.resolve(false);
    } else {
      var hash = result.password;
      console.log('Found user:', result.username);
      if (bcrypt.compareSync(password, hash)) {
        deferred.resolve(signUsername(username));
      } else {
        console.log('Authentication failed');
        deferred.resolve(false);
      }
    }
  });
  return deferred.promise;
}

function localReg(username, password) {
  var deferred = Q.defer();
  db.get('SELECT * from USERS where username = $username', {$username: username}, function(err, result) {
    if (err) deferred.reject(err);
    if (result !== undefined) {
      console.log('Username already exists:', result.username);
      deferred.resolve(false);
    } else {
      var user = {
        $username: username,
        $password:  bcrypt.hashSync(password, 8)
      }
      console.log('Creating user:', username);
      db.run('INSERT INTO USERS (username, password) values ($username, $password)', user, function(err) {
        if (err) {
          deferred.reject(err);
        }
        deferred.resolve(signUsername(username));
      })
    }
  });
  return deferred.promise;
}

// Use the LocalStrategy within Passport to login/"signin" users.
passport.use('local-signin', new LocalStrategy(
  {passReqToCallback : true}, //allows us to pass back the request to the callback
  function(req, username, password, done) {
    localAuth(username, password)
    .then(function (user) {
      if (user) {
        console.log("LOGGED IN AS: " + user.username);
        req.session.success = 'You are successfully logged in ' + user.username + '!';
        done(null, user);
      }
      if (!user) {
        console.log("COULD NOT LOG IN");
        req.session.error = 'Could not log user in. Please try again.'; //inform user could not log them in
        done(null, user);
      }
    })
    .fail(function (err){
      console.log('local-signin error:', err);
    });
  }
));

// Use the LocalStrategy within Passport to register/"signup" users.
passport.use('local-signup', new LocalStrategy(
  {passReqToCallback : true}, //allows us to pass back the request to the callback
  function(req, username, password, done) {
    localReg(username, password)
    .then(function (user) {
      if (user) {
        console.log("REGISTERED: " + user.username);
        req.session.success = 'You are successfully registered and logged in ' + user.username + '!';
        done(null, user);
      }
      if (!user) {
        console.log("COULD NOT REGISTER");
        req.session.error = 'That username is already in use, please try a different one.'; //inform user could not log them in
        done(null, user);
      }
    })
    .fail(function (err){
      console.log('local-signup error:', err);
    });
  }
));

var router = express.Router();

router.get('/api/exercises', function(req, res, next) {
  db.all('SELECT * from EXERCISES', [], function(err, data) {
    if(err) throw err;
    res.send(data);
  });
});

router.get('/api/user-exercises', function(req, res, next) {
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

router.post('/api/user-exercises', function(req, res, next) {
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
      return false;
    } else {
      try {
        jwt.verify(token, app.get('secret'), { algorithm: 'RS256' });
        res.send(true);
      } catch(err) {
        res.send(err);
      }
    }
  } else {
    res.send(false);
  }
});

//sends the request through our local signup strategy, and if successful takes user to homepage, otherwise returns then to signin page
router.post('/api/local-reg', passport.authenticate('local-signup', { failWithError: true }),
  function(req, res, next) {
    // handle success
    return res.json({ user: req.user });
  },
  function(err, req, res, next) {
    // handle error
    return res.json(err);
  }
);

//sends the request through our local login/signin strategy, and if successful takes user to homepage, otherwise returns then to signin page
router.post('/api/authenticate', passport.authenticate('local-signin', { failWithError: true }),
  function(req, res, next) {
    // handle success
    return res.json({ user: req.user });
  },
  function(err, req, res, next) {
    // handle error
    return res.json(err);
  }
);

//logs user out of site, deleting them from the session, and returns to homepage
router.post('/api/logout', function(req, res){
  var name = req.body.username;
  console.log("LOGGING OUT " + req.body.username);
  req.session.destroy(function (err) {
    res.redirect('/'); //Inside a callback… bulletproof!
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