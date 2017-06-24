var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

const APP_TOKEN = 'EAAKzaEKGNmYBAI2EZBQ4zJzGBtHV7QLKTRfJksVrjMCZAh3TZCkHqwZCJ3IVUMGUy40G5e795fOgJppshbs800r1vargVlsTgiZB6ZBltl1WZA7duJL3Hpxv7jFT76sLrDGstlYSnPtXuaCMiW0VaQK6FeR4zODoPbt0KNWokHJPAZDZD';

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
	//if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
	if (req.query['hub.verify_token'] === process.env.VERIFICATION_TOKEN) {
		res.send(req.query['hub.challenge']);
    } else {
        res.send('Error, wrong token')
    }
});

app.post('/webhook', function(req, res){
    var data = req.body;
    if(data.object == 'page'){
        // recorremos las entradas
        data.entry.forEach(function(pageEntry) {
            // recorremos los eventos
            pageEntry.messaging.forEach(function(messagingEvent){
                if(messagingEvent.message){
                    receiveMessage(messagingEvent);
                }
            });
        });
        res.sendStatus(200);
    }
});
//1
function receiveMessage(event){
    var senderID = event.sender.id;
    var messageText = event.message.text;
    console.log(senderID);
    console.log(messageText);
    evaluateMessage(senderID, messageText);
}
//2
function evaluateMessage(recipientId, message){
    var finalMessage = '';
    if(isContain(message, 'ayuda')){
        finalMessage = 'Si claro!, dime en que te puedo ayudar?';
    } else {
        //finalMessage = 'Solo se repetir las cosas: ' + message;
        finalMessage = 'Hola que tal? me puedes decir tu nombre';
    }
    sendMessageText(recipientId, finalMessage);
}
//3
function sendMessageText(recipientId, message){
    var messageData = {
        recipient : {
            id: recipientId
        },
        message: {
            text: message
        }
    };
    callSendAPI(messageData);
}
//4
function callSendAPI(messageData){
    request({
        uri: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: APP_TOKEN },
        method: 'POST',
        json: messageData
    }, function(error, response, data){
        if(error){
            console.log('No es posible enviar el mensaje');
        } else {
            console.log('El mensaje fue enviado');
            //console.log(response);
            //console.log(error);
        }
    })
}

function isContain(sentence, word){
    return sentence.indexOf(word) > -1;
}