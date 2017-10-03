var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


var port = process.env.PORT || 3000;



app.get('/', function(req,res){
	res.sendFile(__dirname + '/index.html');
})
//io.listen(port);

io.on('connection', function(socket) {

	reconnect: false;
	console.log("Connected 1");
	socket.on("new-message", function(msg){

		//console.log(msg);
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
