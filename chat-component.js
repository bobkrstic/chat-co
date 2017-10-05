// import React from 'react';
// import ReactDOM from 'react-dom';
//
// import 'index.css';
var ChatApp = window.React.createClass({

	getInitialState: function(){
		return {
			messages: [],
			//socket: window.io('https://localhost:3000'),
			socket: window.io('https://secure-spire-22112.herokuapp.com/'),
			user: undefined
			// func: window.open('https://secure-spire-22112.herokuapp.com/sadfa','','width=500,height=500')
		};
	},

	// resizeWindow: function(myWindow) {
	// 	myWindow.resizeTo(500,500);
	// 	myWindow.focus();
	// },
	//
	//
	// openWindow: function(){
	// 	var myWindow = window.open('https://secure-spire-22112.herokuapp.com/','','width=500, height=500');
	// // return false;
	// 	this.resizeWindow(myWindow);
	// },


	componentDidMount: function(){
			// console.log(this.state.socket);
		// window.open("https://secure-spire-22112.herokuapp.com/d", "chat-co", "width=500, height=700");
		 //this.openWindow();
		var self = this;
		this.state.socket.on("receive-message", function(msg){
			// console.log(msg);
			var messages = self.state.messages;
			messages.push(msg);
			self.setState({messages: messages});
			var elem = document.getElementsByTagName('UL')[0];
			elem.scrollTop = elem.scrollHeight;
			console.log(self.state.messages);
		});
	},

	submitMessage: function(){
		var body = document.getElementById("message").value;

		var message = {
			body: body,
			user: this.state.user || "guest"
		};

		this.state.socket.emit("new-message", message);
		// console.log(message);
		document.getElementById("message").value = "";
	},

	// moveWindow: function() {
	// 	window.open("http://localhost:3000/", "chat-co", "width=500, height=600");
	// 	return false;
	// },

	newChat: function() {
		alert("here goes code for new chat room");
	},

	pickUser: function(){
		var user = document.getElementById("user").value;
		this.setState({user:user});
	},

	render: function(){
		var self = this;
		var messages = this.state.messages.map(function(msg){
			return  (
				<li><strong>{msg.user}:<span>{" "}{" "}</span></strong><span>{msg.body}</span></li>
			);
		});

		return(
			<div className='container-fluid wrapper'>
				<div className="mainTitle">CHAT-CO</div>
				<div className="jumbotron">

					<div className="container-fluid">
							<div className="row" id="textChatArea">
								<ul>
									{messages}
								</ul>
							</div>
							<div className="row">
										<input id="message" type="text"/>
	  			 					<button id="messageButton" className='btn' onClick={() => self.submitMessage()}> Send </button>
			  			</div>
							<br />
							<div className="row">
								<div id="inputAndButton">
										<input id="user" type="text" placeholder="choose a username" />
										<button className='btn' onClick={() => self.pickUser()}> User </button>
								</div>
							</div>
					</div>
				</div>

				<div className="container">
					<div className="row">
						<input id="chatGroup" type="text" placeholder="choose a group name" />
						<button className='btn' id="newChat" onClick={() => self.newChat()}> New Chat </button>
					</div>
				</div>

				<br />

				<div className="jumbotron advertisements">
						<div className="insertImage"></div>
				</div>

			</div>

		);
	}

});


window.ReactDOM.render(<ChatApp/>, document.getElementById("chat"));
