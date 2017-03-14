var bigData = require('../messages.json');
var sentData = require('../sentMessages.json');

exports.viewMessages = function(req, res) {
	//controller code goes here
	var messages = bigData.messagesList;

	for (var i=0; i < messages.length; i++) {
		if (messages[i].message == "") {
			bigData.messagesList.splice(i,1);
		}
	}
	
	res.json(bigData);
	// res.json(sentData);
}

exports.editMessages = function(req, res) {
	// console.log("editMessages");
	var data = JSON.stringify(req.body);
	console.log(data);
	var length = data.length;
	var name;
	if (data[5] == "n") {
		var messages = bigData.messagesList;

		//loop through data string to get name
		for (var i = 14; i < length; i++) {
			if (data[i] == "}") {
				var end = i-2;
				name = data.slice(14,end);
				break;
			}
		}

		//loop through json data
		for (var j = 0; j < messages.length; j++) {
			if (messages[j].name == name) {
				var newData = {
					name: name,
					image: "http://mentorapp5.herokuapp.com/images/head.jpg",
					notify: "one",
					message: messages[j].message
				};
				bigData.messagesList.splice(j, 1, newData);
				// console.log(bigData.messagesList);
				break;
			}
		}
		res.render('messages', bigData);

	} else if (data[5] == "r") {
		//loop through data string to get name
		for (var i = 18; i < length; i++) {
			var sentM = sentData.sentList;
			var myMessage;

			if (data[i] == ",") {
				var end = i-2;
				name = data.slice(18,end);

				for (var j = (i+15); j < length; j++) {
					if (data[j] == "}") {
						var end2 = j-2;
						myMessage = data.slice((i+15),end2);
						console.log(myMessage);
						break;
					}
				}
			}
		}
		//
		// var newData = {
		// 	receiver: name,
		// 	message: myMessage
		// };

		//loop through json data
		for (var k = 0; k < sentM.length; k++) {
			if (sentM[k].receiver == name) {
				var newData = {
					receiver: name,
					message: myMessage
				};
				sentData.sentList.splice(k, 1, newData);
				// console.log(bigData.messagesList);
				break;
			}
		}

	}
}
