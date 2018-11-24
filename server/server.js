const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(path.join(__dirname, "./../public")));

io.on("connection", socket => {
  console.log("Connected to Server");

  socket.on("createMessage", newMessage => {
    console.log("New message: ", newMessage);
    io.emit("newMessage", {
      from: newMessage.from,
      text: newMessage.text,
      createdAt: Date.now()
    });
  });

  socket.on("disconnect", () => {
    console.log("Disconnected Server");
  });
});

server.listen(port, () => {
  console.log(`app listening on port${port}`);
});
