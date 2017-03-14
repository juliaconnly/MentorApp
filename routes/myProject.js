var profileData = require('../data.json');

exports.viewProject = function(req, res) {
	//controller code goes here
	console.log("myProject.js");
	var profile = profileData.myData;

	var person = profile[0];
	var name = person.name;
	var major = person.major;
	var college = person.college;
	var description = person.description;
	var summary = person.summary;

	res.render('myProject', {
		'projectName': name,
		'major': major,
		'college': college,
		'description': description,
		'summary': summary,
	});
}

exports.addProject = function(req, res) {
	console.log(profileData);
	var data = JSON.stringify(req.body);
	console.log(data);
	var length = data.length;
	var name;
	var major;
	var college;
	var status;
	var summary;
	var description;
	var index;

	// loop to get name
	for (var i = 11; i < length; i++) {
		if (data[i] == ",") {
			var end = i-2;
			name = data.slice(11,end);
			break;
		}
	}

	// loop to get major
	index = i;
	console.log(index);
	for (var j = (index+9); j < length; j++) {
		if (data[j] == ",") {
			var end = j-2;
			major = data.slice((index+9),end);
			break;
		}
	}

	// loop to get college
	index = j;
	console.log(index);
	for (var k = (index+9); k < length; k++) {
		if (data[k] == ",") {
			var end = k-2;
			college =data.slice((index+9),end);
			break;
		}
	}

	// loop to get summary
	index = k;
	console.log(index);
	for (var l = (index+11); l < length; l++) {
		if (data[l] == ",") {
			var end = l-2;
			summary = data.slice((index+9),end);
			break;
		}
	}

	//loop to get description
	index = l;
	console.log(index);
	for (var m = (index+11); m < length; m++) {
		if (data[m] == "}") {
			var end = m-2;
			description = data.slice((index+9),end);
			break;
		}
	}

	var newData = {
		name: name,
		image: "images/head.jpg",
		major: major,
		college: college,
		status: status,
		summary: summary,
		description: description
	};

	// profileData.matchesList.push(newData);
	profileData.myData.splice(0,1,newData);

	console.log(profileData.myData);

}