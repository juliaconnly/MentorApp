var sentData = require('../sentMessages.json');

exports.viewMessages = function(req, res) {
	//controller code goes here
	res.json(sentData);
}
