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
});
