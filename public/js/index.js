//add socket io functionality
var socket = io();
//client socket connections
socket.on("connect", function() {
  console.log("Client Connect");

  //emit new message
  socket.emit("createMessage", {
    from: "Jojo96",
    text: "Yo! topogeejo"
  });
});

socket.on("newMessage", function(newMessage) {
  console.log("Recieved Message: ", newMessage);
});

socket.on("disconnect", function() {
  console.log("Client disconnect");
});
