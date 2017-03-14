
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')

var index = require('./routes/index');
// Example route
// var user = require('./routes/user');
var project = require('./routes/project');
var myProject = require('./routes/myProject');
var messages = require('./routes/messages');
var messages2 = require('./routes/messages2');
var sentMessages = require('./routes/sentMessages');
var viewmessages = require('./routes/viewmessages');
var FAQ = require('./routes/FAQ');
var settings = require('./routes/settings');
var login = require('./routes/login');
var carousel = require('./routes/carousel');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', index.view);
// Example route
// app.get('/users', user.list);
app.get('/project/:name', project.viewProject);
app.get('/messages/viewmessages/:name', viewmessages.viewViewmessages);
app.get('/FAQ', FAQ.viewFAQ);
app.get('/settings', settings.viewSettings);
app.get('/login', login.viewLogin);
app.get('/carousel', carousel.viewCarousel);
app.get('/messages', messages.viewMessages);
app.get('/messages2', messages2.viewMessages);
app.post('/messages2', messages2.editMessages);
app.get('/sentMessages', sentMessages.viewMessages);
app.get('/myProject', myProject.viewProject);
app.post('/myProject', myProject.addProject);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
