'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	startPage();
});

var choice;
/*
 * Function that is called when the document is ready.
 */
function startPage() {
	// add any functionality and listeners you want here
	console.log("Here");
	$('.backimg').click(back);
	// $('#submitBtn').click(sendMessage);
	//$('#submitBtn').click(timeStamp);
	$('#saveBtn').click(addMajor);
	$('#saveBtn').click(addName);
	$('#saveBtn').click(addDescription);
	// $('#message').keypress(function(e) {
	// 	if (e.which == 13) {
	// 		sendMessage(e);
	// 	}
	// });
	$('.FAQdrop').click(addFAQDetails);
	$('.form-horizontal').submit(function(e) {
		e.preventDefault();
	});

	$($('.item')[0]).addClass("active");
	console.log("works");

	$('#saveBtn').click(editProfile);

}

function editProfile() {
	console.log("Here");
	var name = $("#name").val();
	var major = $("#major").val();
	var description = $("#experience").val();
	var college = $("#college").val();
	var summary = $("#summary").val();
	var button1 = document.getElementById("selectBtn");
	var status = button1.innerText;
	var data = {
		"n": name,
		"m": major,
		"c": college,
		"s": summary,
		"d": description 
	};

	console.log(data);

	$.ajax({
		type: "POST",
		url: "/myProject",
		data: JSON.stringify(data),
		dataType: "json"
	});
}

function back() {
	window.history.back();
}

function addFAQDetails(e){
	e.preventDefault();

	var faqID = $(this).closest('.dropdown').attr('id');
	var idNumber = faqID.substr('project'.length);

	$get("/FAQ/" + idNumber, callBackFn);
}

// function sendMessage(e) {
// 	e.preventDefault();
//
// 	var receiver = $("h5").html();
// 	var message = $("#message").val();
// 	if (message == "") {
// 		console.log("No message entered!");
// 		return;
// 	} else {
// 		$("#myMessage").append("<br/>" + $("#message").val());
// 	}
//
// 	document.getElementById("message").value = "";
// }

function addMajor(e) {
	e.preventDefault();
	$(".project").html($("#userMajor").val() + "<br/>");
}

function addName(e) {
	e.preventDefault();
	$(".nameInput").html($("#userName").val() + "<br/>");
}

function addDescription(e) {
	e.preventDefault();
	$(".descriptionInput").html($("#userDescription").val() + "<br/>");
}


$('#mentor').click(function(e) {
	var button1 = document.getElementById("selectBtn");
	button1.innerText = "Mentor";
});

$('#mentee').click(function(e) {
	var button1 = document.getElementById("selectBtn");
	button1.innerText = "Mentee";
});

function displayMentors() {
	//display mentors with status 0
	console.log("mentor pressed");
  // $.get("/data.json", function(result){
  //   console.log(result);
  // });
	 choice = 0;
	 $.get("/data.json", callBackFn);


}

function displayMentees() {
	//display mentees with status 1
	// var array;
	console.log("mentee pressed");
 //  $.get("/data.json", function(result){
 //    console.log(result);
 //    // array = result;
 //    for (var i = 0; i < result.length; i++) {
 //    console.log("hi");
 //  }
 //  });
	choice = 1;
	$.get("/data.json", callBackFn);


}

function callBackFn(result) {
	if (choice == 0) {
		$("#0.choice").show();
		$("#1.choice").hide();
	} else {
		$("#0.choice").hide();
		$("#1.choice").show();		
	}
}



function timeStamp() {
	// console.log("time is" + Date.now());
	// return Date.now();
		// console.log("time is" + Date.getTime());
		// console.log(seconds);
	var time = new Date().getTime();
	var date = new Date(time);
	console.log(date);
	//return date;
	$("#timestamp").append("<br/>" + date);

 	// e.preventDefault();
 	// $(".timeInput").html(date);
  // };


  // $.get("/data.json", function(result){
  //   console.log(result);
  }




// $('#mentor').click(function(e) {
//     alert('alerted');
//     console.log("yes");
//     e.preventDefault();// prevent the default anchor functionality
// });
