//add socket io functionality
var socket = io();
//client socket connections
socket.on("connect", function() {
  console.log("Client Connect");
});

socket.on("newMessage", function(newMessage) {
  let formattedDate = moment(newMessage.createdAt).format("h:mm a");
  let li = $("<li></li>");
  li.text(`${newMessage.from} ${formattedDate}: ${newMessage.text}`);
  $("#message_list").append(li);
});

socket.on("newLocationMessage", function(message) {
  let formattedDate = moment(message.createdAt).format("h:mm a");
  let li = $("<li></li>");
  let a = $('<a target="_blank"></a>');
  a.text("current location");
  a.attr("href", message.url);
  li.append(`${message.from} ${formattedDate}: `).append(a);
  $("#message_list").append(li);
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
        from: "User",
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
