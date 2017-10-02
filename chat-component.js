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
		};
	},

	componentDidMount: function(){
		var self = this;
		this.state.socket.on("receive-message", function(msg){
			// console.log(msg);
			var messages = self.state.messages;
			messages.push(msg);
			self.setState({messages: messages});
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
				<div className="mainTitle">chat-co</div>
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

				<div className="jumbotron">
						Advertise your company and reach billion people at once. LOL
				</div>

			</div>

		);
	}

});


window.ReactDOM.render(<ChatApp/>, document.getElementById("chat"));
