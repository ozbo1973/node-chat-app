//add socket io functionality
var socket = io();
//client socket connections
socket.on("connect", function() {
  console.log("Client Connect");
});

socket.on("newMessage", function(newMessage) {
  console.log("Recieved Message: ", newMessage);
  let li = $("<li></li>");
  li.text(`${newMessage.from}: ${newMessage.text}`);
  $("#message_list").append(li);
});

socket.on("newLocationMessage", function(message) {
  let li = $("<li></li>");
  let a = $('<a target="_blank"></a>');
  a.text("Users location");
  a.attr("href", message.url);
  li.append(a);
  $("#message_list").append(li);
});

socket.on("disconnect", function() {
  console.log("Client disconnect");
});

$(document).ready(function() {
  $("#message_form").on("submit", e => {
    e.preventDefault();
    socket.emit(
      "createMessage",
      {
        from: "User",
        text: $("#text").val()
      },
      function(data) {
        console.log("Recieved: ", data);
      }
    );
  });

  const locationButton = $("#btn_sendLocation");
  $(locationButton).on("click", function() {
    if (!navigator.geolocation) {
      return alert("Geolocation not available on your browser");
    }
    navigator.geolocation.getCurrentPosition(
      function(position) {
        socket.emit("sendLocation", {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      function() {
        alert("Unable to fetch location");
      }
    );
  });
});
