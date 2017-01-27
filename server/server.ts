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

var port: number = process.env.PORT || 3000;
var app = express();

var db = new sqlite3.Database('workouts.db');

app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(session({secret: 'supernova', saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());

//===============PASSPORT=================
// Passport session setup.
passport.serializeUser(function(user, done) {
  console.log("serializing " + user.username);
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  console.log("deserializing " + obj);
  done(null, obj);
});

function localAuth(username, password) {
  var deferred = Q.defer();
  console.log(username, password);
  db.get('SELECT * from USERS where username = $username', {$username: username}, function(err, result) {
    console.log('hi:', result);
    console.log('err:', err);
    if (err) deferred.reject(err);
    if (result === undefined) {
      console.log('Username not found:', username);
      deferred.resolve(false);
    } else {
      var hash = result.password;
      console.log('Found user:', result.username);
      if (bcrypt.compareSync(password, hash)) {
        deferred.resolve(result);
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
        deferred.resolve({username: username});
      })
    }
  });
  return deferred.promise;
}

// Use the LocalStrategy within Passport to login/"signin" users.
passport.use('local-signin', new LocalStrategy(
  {passReqToCallback : true}, //allows us to pass back the request to the callback
  function(req, user, done) {
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

//sends the request through our local signup strategy, and if successful takes user to homepage, otherwise returns then to signin page
router.post('/api/local-reg', passport.authenticate('local-signup', {
  successRedirect: '/',
  failureRedirect: '/register'
  })
);

//sends the request through our local login/signin strategy, and if successful takes user to homepage, otherwise returns then to signin page
router.post('/api/authenticate', passport.authenticate('local-signin', {
  successRedirect: '/',
  failureRedirect: '/login'
  })
);

//logs user out of site, deleting them from the session, and returns to homepage
router.get('/api/logout', function(req, res){
  var name = req.user.username;
  console.log("LOGGIN OUT " + req.user.username)
  req.logout();
  res.redirect('/');
  req.session.notice = "You have successfully been logged out " + name + "!";
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