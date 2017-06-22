var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

const APP_TOKEN = 'EAAKzaEKGNmYBAN5asw7xmNLukmo5Xl0MeG4k2PAjEIhKZCHdRAfUuLHnCO2WvUZAN08t0AZCT7u7CUm3l29Y0poFg0tjWfphdDZBynYWw2r7p9QtcGGgv5b2C6MdGgwabNvbM7kEiKJCXUl1h6QG1Sk7H8F6QuO2zcZCW4dmIhQZDZD';

var app = express();
app.use(bodyParser.json());

app.listen(9000, function(){
    console.log("El servidor se encuentra en el puerto 9000");
});

app.get('/', function(req, res){
    res.send('Bienvenido!')
});

// for Facebook verification
app.get('/webhook/', function (req, res) {
	if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
		res.send(req.query['hub.challenge']);
    } else {
        res.send('Error, wrong token')
    }
});
