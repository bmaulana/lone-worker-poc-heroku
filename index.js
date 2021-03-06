var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var lastMessage = "";
var localDB = {};
var localDBCounter = 0;

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
	response.render('pages/dashboard', {db: localDB, len : localDBCounter});
});

app.get('/dashboard', function(request, response) {
    console.log(localDB);
    response.render('pages/dashboard', {db: localDB, len : localDBCounter});
});

app.get('/notif', function(request, response) {
    response.send(lastMessage);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/', function(request, response) {
    var post_data = request.body;
    var currentdate = new Date();
    var time = currentdate.getDate() + "/"
        + (currentdate.getMonth()+1)  + "/"
        + currentdate.getFullYear() + " "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds() + "; " ;
    lastMessage = time.toString() + post_data.message;
    console.log(lastMessage);
    response.redirect("/");
});

app.post('/test', function(request, response) {
    var post_data = request.body;
    console.log(post_data); //TODO display data in table on website
    localDB[localDBCounter] = post_data;
    localDBCounter++;
    response.end();
});

app.get('/clear', function(request, response) {
    localDB = {};
    localDBCounter = 0;
    response.redirect("/");
});

app.get('/refresh', function(request, response) {
    response.redirect("/");
});

app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});