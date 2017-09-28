// import React from 'react';
// import ReactDOM from 'react-dom';

var ChatApp = window.React.createClass({

	getInitialState: function(){
		return {
			messages: [],
			socket: window.io('http://localhost:3000'),
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
	},

	pickUser: function(){
		var user = document.getElementById("user").value;
		this.setState({user: user});
	},

	render: function(){
		var self = this;
		var messages = this.state.messages.map(function(msg){
			return  (
				<li><strong>{msg.user}</strong><span>{msg.body}</span></li>
			);
		});

		return(
			<div> 
				<ul>
					{messages}
				</ul>

				<input id="message" type="text"/><button onClick={() => self.submitMessage()}> Send Message </button><br/>
				<input id="user" type="text" placeholder="choose a username"/><button onClick={() => self.pickUser()}> Select User </button>
			</div>
		);
	}

});


window.ReactDOM.render(<ChatApp/>, document.getElementById("chat"));