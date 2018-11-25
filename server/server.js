const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const { generateMessage, generateLocationMessage } = require("./utils/message");

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(path.join(__dirname, "./../public")));

io.on("connection", socket => {
  console.log("Connected to Server");

  socket.emit(
    "newMessage",
    generateMessage("Admin", "Welcome to the Chat App!")
  );
  socket.broadcast.emit(
    "newMessage",
    generateMessage("Admin", "New User has joined.")
  );

  socket.on("sendLocation", coords => {
    io.emit(
      "newLocationMessage",
      generateLocationMessage("Admin", coords.lat, coords.lng)
    );
  });

  socket.on("createMessage", (newMessage, callback) => {
    console.log("New message: ", newMessage);
    io.emit("newMessage", generateMessage(newMessage.from, newMessage.text));
    callback("From server");
  });

  socket.on("disconnect", () => {
    console.log("Disconnected Server");
  });
});

server.listen(port, () => {
  console.log(`app listening on port${port}`);
});
