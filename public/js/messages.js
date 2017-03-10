'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
  initializePage();
});

var messageName;

function initializePage() {
  // $.get("/messages.json", setUpPage);
  console.log("messages.js");
  $('.backimg').click(back);
  $.get("/messages2", setUpPage);
  $.get("/sentMessages", setUpPage2);
  $('.project').click(notify);
  $('#submitBtn').click(sendMessage);
  $('#message').keypress(function(e) {
    if (e.which == 13) {
      sendMessage(e);
    }
  });
}

function back() {
  window.history.back();
}

function setUpPage(result) {
  var messagesArray = result['messagesList'];
  console.log(result);
  for (var i = 0; i < messagesArray.length; i++) {
    var theirName = messagesArray[i].name;
    var name = theirName.split(' ')[0];
     if (messagesArray[i].notify == "zero") {
      // console.log("Here");
      $(".mailimg").attr("src", "../../newMessageIcon.png");
      // $("#" + name + " #inbox").css({
      //  'background-color': '#F8FBFB'
      // });
      $("#" + name + " #messageM").css({
        'color': 'black',
        'font-weight': 'bold',
        'font-size': '14px'
      });
    } else {
      $("#" + name + " #messageM").css({
        'color': 'black',
        'font-size': '12px'
      });
    }
  }
}

function setUpPage2(result) {
  var sentArray = result['sentList'];
  var receiver;
  var name;
  for (var i = 0; i < sentArray.length; i++) {
    if (sentArray[i].message == "") {
      continue;
    }
      receiver = sentArray[i].receiver;
      name = receiver.split(' ')[0];
      $("#" + name + " #messageM").html(sentArray[i].message);

  }
}

function notify(e) {
  console.log("notify called");
  messageName = $(this).closest('.project').attr('id');
  // $.get("/messages.json", updateNotify);
  $.get("/messages2", updateNotify);
}

function updateNotify(result) {
  console.log("updateNotify");
  var messages = result['messagesList'];
  for (var i = 0; i < messages.length; i++) {
    var name = messages[i].name.split(' ')[0];
    if (name == messageName) {
      var fullName = messages[i].name;
      var pic = messages[i].image;
      var message = messages[i].message;

      var data = {
        "name": fullName
      };
      $.ajax({
        type: "POST",
        url: "/messages2",
        data: JSON.stringify(data),
        dataType: "json"
      });
      break;
    }
  }
  var parameters = {};
  $.get("/messages2", newCallBack);
  // $.get("/messages.json", newCallBack);
  // console.log(messages[1].notify);
}

function newCallBack(result) {
  console.log(result);
}

function sendMessage(e) {
  e.preventDefault();
  console.log("sendMessage");
  var receiver = $("h5").html();
  var message = $("#message").val();
  if (message == "") {
    console.log("No message entered!");
    return;
  } else {
    $("#myMessage").append("<br/>" + $("#message").val());
    var value = $("#message").val();
  }
  var data = {
    "receiver": receiver,
    "message": value
  };
  $.ajax({
    type: "POST",
    url: "/messages2",
    data: JSON.stringify(data),
    dataType: "json"
  });

  $.get("/sentMessages", newCallBack2);

  document.getElementById("message").value = "";
}

function newCallBack2(result) {
  console.log(result);
}
