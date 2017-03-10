var data = require('../data.json');

exports.viewProject = function(req, res) {
	//controller code goes here
	var name = req.params.name;
	var profiles = data.matchesList;
	var index = -1;

	console.log("The project name is: " + name);

	for (var i = 0; i < profiles.length; i++) {
		if (profiles[i].name == name) {
			index = i;
			break;
		}
	}

	if (index == -1) {
		console.log("Name not in JSON file.")
	} else {
		var person = profiles[index];
		var major = person.major;
		var description = person.description;
	}


	res.render('project', {
		'projectName': name,
		'major': major,
		'description': description
	});
}



