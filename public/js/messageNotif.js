'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
});

var messageName;

function initializePage() {
	$('.backimg').click(back);
  $.get("/messages2", setUpNavBar);
}

function back() {
	window.history.back();
}

function setUpNavBar(result){
	var messagesArray = result['messagesList'];
	//console.log(result);
	for (var i = 0; i < messagesArray.length; i++) {
		var theirName = messagesArray[i].name;
		var name = theirName.split(' ')[0];
		 if (messagesArray[i].notify == "zero") {
			$(".mailimg").attr("src", "../../newMessageIcon.png");
			break;
		}
	}
}
