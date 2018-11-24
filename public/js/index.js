//add socket io functionality
var socket = io();
//client socket connections
socket.on("connect", function() {
  console.log("Client Connect");
});

socket.on("newMessage", function(newMessage) {
  console.log("Recieved Message: ", newMessage);
});

socket.on("disconnect", function() {
  console.log("Client disconnect");
});
