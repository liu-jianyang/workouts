import express = require('express');
import path = require('path');
import favicon = require('serve-favicon');
import logger = require('morgan';
import cookieParser = require('cookie-parser');
import bodyParser = require('body-parser');

// var routes = require('./routes/index');
var port: number = process.env.PORT || 3000;
var app = express();

app.use(favicon(path.join(__dirname, 'favicon.ico')));

// app.use('/', routes);
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