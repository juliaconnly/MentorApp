var bigData = require('../messages.json');
var sentData = require('../sentMessages.json');

exports.viewMessages = function(req, res) {
	//controller code goes here
	var messages = bigData.messagesList;
	var send = sentData.sentList;

	var copy = {"messagesList": []};
	var messages2 = copy.messagesList;
	var receivedFlag = 0;
	for (var i=0; i < messages.length; i++) {
		var name = messages[i].name;

		if (messages[i].message == "") {
			continue;
		} else {

			for (var j=0; j < send.length; j++) {
				if (send[j].receiver == name) {
					var theirMessage = send[j].message;
					if (theirMessage != "") {
						copy.messagesList.push(messages[i]);
						messages2[i].message = theirMessage;
						receivedFlag = 1;
						break;
					}
				}
			}

			if (receivedFlag == 0) {
				copy.messagesList.push(messages[i]);
			} else {
				receivedFlag = 0;
			}
		}
	}

	res.render('messages', copy);
}
