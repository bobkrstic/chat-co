var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket) {

	console.log("Connected 1");
	socket.on("new-message", function(msg){

		console.log(msg);
		io.emit("receive-message", msg);

	})
	socket.on("test", function(){
		console.log("mounted");
	})
});


// var staticAsset = require('static-asset');
app.use(express.static(__dirname + "/") );


http.listen('3000', function(){

	console.log("Connected");

});