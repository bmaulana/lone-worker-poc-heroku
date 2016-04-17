var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
	response.render('pages/index');
});

app.get('/notif', function(request, response) {
    var time = Date.now(); // TODO should be updated only when new broadcast message
    response.send(time.toString() + ": " + " Message from Head Office"); //TODO enable dynamic responses
});

app.post('/test', function(request, response) {
    console.log("test"); //TODO handle request, display incoming messages in a table
    response.end();
});

app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});