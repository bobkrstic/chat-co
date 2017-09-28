var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


var port = process.env.PORT || 3000;


// io.listen(port, function(){
// 	console.log("Listening on io port");
// });

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






http.listen(port, function(){

	console.log("Connected");

});