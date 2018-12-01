//add socket io functionality
var socket = io();
//client socket connections
socket.on("connect", function() {
  console.log("Client Connect");
  var params = $.deparam(window.location.search);
  socket.emit("join", params, function(err) {
    if (err) {
      alert(err);
      window.location.href = "/";
    } else {
      console.log("No Errors");
    }
  });
});

function scrollToBottom() {
  var messages = $("#message_list");
  var clientHeight = messages.prop("clientHeight");
  var scrollTop = messages.prop("scrollTop");
  var scrollHeight = messages.prop("scrollHeight");
  var newMessage = messages.children("li:last-child");
  var newMessageHeight = newMessage.innerHeight();
  var prevMessageHeight = newMessage.prev().innerHeight();

  if (
    clientHeight + scrollTop + newMessageHeight + prevMessageHeight >=
    scrollHeight
  ) {
    messages.scrollTop(scrollHeight);
  }
}

socket.on("newMessage", function(newMessage) {
  const { from, text, createdAt } = newMessage;
  let time = moment(createdAt).format("h:mm a");
  let template = $("#message-template").html();
  let html = Mustache.render(template, {
    from,
    text,
    time
  });
  $("#message_list").append(html);
  scrollToBottom();
});

socket.on("newLocationMessage", function(message) {
  const { from, url, createdAt } = message;
  let time = moment(createdAt).format("h:mm a");
  let template = $("#location-message-template").html();
  let html = Mustache.render(template, {
    from,
    url,
    time
  });
  $("#message_list").append(html);
});

socket.on("updatedUserList", function(users) {
  let ol = $("<ol></ol>");
  users.forEach(user => {
    ol.append($("<li></li>").text(user));
  });
  console.log(ol);
  $("#people-list").html(ol);
});

socket.on("disconnect", function() {
  console.log("Client disconnect");
});

$(document).ready(function() {
  const messageBox = $("#text");
  $("#message_form").on("submit", e => {
    e.preventDefault();
    socket.emit(
      "createMessage",
      {
        text: messageBox.val()
      },
      function(data) {
        messageBox.val("");
      }
    );
  });

  const locationButton = $("#btn_sendLocation");
  $(locationButton).on("click", function() {
    if (!navigator.geolocation) {
      return alert("Geolocation not available on your browser");
    }
    locationButton.attr("disabled", "disabled").text("Sending location....");
    navigator.geolocation.getCurrentPosition(
      function(position) {
        locationButton.removeAttr("disabled").text("Send location");
        socket.emit("sendLocation", {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      function() {
        locationButton.removeAttr("disabled").text("Send location");
        alert("Unable to fetch location");
      }
    );
  });
});
