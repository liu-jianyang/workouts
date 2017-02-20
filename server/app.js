var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sqlite3 = require('sqlite3');
var Q = require('q');
var bcrypt = require('bcryptjs');
var methodOverride = require('method-override');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var fs = require('fs');
var path = require('path');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
var db = new sqlite3.Database('workouts.db');
var secret = 'Jj3A2n2YoPQwSWRx';

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev', {stream: accessLogStream}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(session({secret: 'supernova', saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());
app.set('secret', secret);

app.use('/', routes);
app.use('/api', users);

/// error handlers

/**
 * Development Settings
 */
var env = app.get('env').trim();
if (env === 'development') {
	// This will change in production since we'll be using the dist folder
	// This covers serving up the index page
	// app.use(express.static(path.join(__dirname, '../client/.tmp')));
	app.use(express.static(path.join(__dirname, '../client')));

	// Error Handling
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

/**
 * Production Settings
 */
if (env === 'production') {

	// changes it to use the optimized version for production
	app.use(express.static(path.join(__dirname, '/dist')));

	// production error handler
	// no stacktraces leaked to user
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: {}
		});
	});
}


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
  };
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

module.exports = app;