var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
	response.render('pages/index');
});

app.get('/dashboard', function(request, response) {
    response.render('pages/dashboard');
});

app.get('/notif', function(request, response) {
	var currentdate = new Date(); 
	var time = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds() + "; " ;
    response.send(time.toString()+ "Message from Head Office"); //TODO enable dynamic responses
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
    console.log(time.toString() + post_data); //TODO save this as string to send when GET notif is called
    response.end();
});

app.post('/test', function(request, response) {
    var post_data = request.body;
    console.log(post_data); //TODO display data in table on website
    response.end();
});

app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});