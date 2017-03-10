var bigData = require('../messages.json');

exports.viewMessages = function(req, res) {
	//controller code goes here
	res.render('messages', bigData);
}
