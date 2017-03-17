'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
  $('sendList').hide();
  initializePage();
});

var messageName;
var messagesArray;

function initializePage() {
  // $.get("/messages.json", setUpPage);
  console.log("messages.js");
  $('.sendList').hide();
  $('.backimg').click(back);
  $('.newMessage').click(getReceiver);
  $.get("/messages2", setUpPage);
  $.get("/sentMessages", setUpPage2);
  $('.project').click(notify);
  $('#submitBtn').click(sendMessage);
  $('#message').keypress(function(e) {
    if (e.which == 13) {
      sendMessage(e);
    }
  });
  $('.link').click(function(e) {
    $('.sendList').hide();
    $('.container').show();
  });
}

function getReceiver(){
  $('.container').hide();
  $('.sendList').show();
  $.get("/data.json", newMessage);
}

function newMessage(result) {
  console.log(result);
  var profiles = result['matchesList'];
  for (var i =0; i < profiles.length; i++) {
    var name = profiles[i].name;
    var image = profiles[i].image;
    $("#" + (i+1) + " .thumbnail").attr("href", "viewmessages/" + name);
    $("#" + (i+1) + " .profilepic2").attr("src", image);
    var nameID = document.getElementById("name" + (i+1));
    nameID.innerHTML = name;
    $("#name"+(i+1)).css({
      'color': 'black',
      'font-size': '14px',
      'font-weight': '500'
    });
  }
}

function back() {
  window.history.back();
}

function setUpPage(result) {
  messagesArray = result['messagesList'];
  console.log(result);
  for (var i = 0; i < messagesArray.length; i++) {

    if (messagesArray[i].notify == "zero") {
      $(".mailimg").attr("src", "../../newMessageIcon.png");
    }
  }
}

function setUpPage2(result) {
  messageName = document.getElementById("viewmessageName").innerHTML;
  var theirMessage = document.getElementById("theirMessage").innerHTML;
  if (theirMessage == "") {
    $("#theirChat").hide();
  }
  var sentList = result['sentList'];
  for (var i = 0; i < sentList.length; i++) {
    if (sentList[i].receiver == messageName) {
      if (sentList[i].message == "") {
        $("#myChat").hide();
        break;
      }
    }
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
    var name = messages[i].name;
    if (name == messageName) {
      var data = {
        "name":name
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
