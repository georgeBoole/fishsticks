// message.js
// this script wraps server/client communication using socket.io
ig.module(
	'game.api.client'
)
.requires(
)
.defines(function() {
	var messages = [];
	var HOST = 'http://192.168.1.12:8080';
	var socket = io.connect('http://localhost:3700');

		/*	    
			var messages = [];
		    
		    var field = document.getElementById("field");
		    var sendButton = document.getElementById("send");
		    var content = document.getElementById("content");
		 
		    socket.on('message', function (data) {
		        if(data.message) {
		            messages.push(data.message);
		            var html = '';
		            for(var i=0; i<messages.length; i++) {
		                html += messages[i] + '<br />';
		            }
		            content.innerHTML = html;
		        } else {
		            console.log("There is a problem:", data);
		        }
		    });
		 
		    sendButton.onclick = function() {
		        var text = field.value;
		        socket.emit('send', { message: text });
		    };
	    */

	var socket = io.connect(HOST);
	socket.on('hit', function(data) {

	});
	socket.on('addplayer', function(data) {

	});
	socket.on('message', function(data) {

	});
	socket.on('players', function(data) {

	});

	requestShot = function(x, y, player_id) {
		socket.emit('request_shot', x, y, player_id)
	};
});