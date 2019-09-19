const express = require('express');
const mongoose = require('mongoose');
let app = express();
let configure = require('./server/configure');

app.set('port', process.env.PORT || 7600);

app = configure(app);

mongoose.connect('mongodb://ernestium:AccessMethod781227@ds135421.mlab.com:35421/heroku_5shlmndh', {useNewUrlParser: true});

mongoose.connection.on('error', console.error.bind(console, 'Connection Error'));

mongoose.connection.once('open', function(){
	console.log('Connected to Database');
});

let server = app.listen(app.get('port'), function(){
	console.log("Server listening at localhost:" + app.get('port'));
});

require('./server/chat_server').initialize(server);