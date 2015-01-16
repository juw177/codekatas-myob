var express = require('express'),
    path = require('path'),
	http = require('http'),
	wordlist = require('./wordlist.json'),
	app = express();


var env = process.env.NODE_ENV || 'development';

//setup node environment -> defaults to development
process.env.NODE_ENV = env;

function globalErrorHandler(err, req, res, next) {
    console.error('Unexpected ERROR: ' + err.stack);
    res.send(500, 'Unexpected Error');
 }

var env = process.env.NODE_ENV || 'development';
if ('development' == env) {
    app.use(express.logger('dev'));
	//app.use(express.json());
	app.use(express.urlencoded());

	//the middleware order matters that's why we use the rounting middleware before the static one
	app.use(app.router);

	//static middleware
	app.use(express.static(path.join(__dirname, 'app')));

	app.use(globalErrorHandler);
}


app.get('/*', function(req, res, next){
	res.header('Access-Control-Allow-Origin', '*');
	next();
});


app.get('/wordlist', function(req, res, next) {
    res.send(wordlist);
});


app.post('/log/error', function(req, res) {
    res.send(200);
});

app.set('port', process.env.PORT || 8998);

http.createServer(app).listen(app.get('port'), function(){
    console.log(">> HTTP Server running - port " + app.get('port'));
});


