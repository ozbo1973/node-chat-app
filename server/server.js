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

  //newMessage emitter
  socket.emit("newMessage", {
    from: "ozbo1973",
    text: "This is how we do",
    createdAt: Date.now()
  });

  //listen for newMessage
  socket.on("createMessage", newMessage => {
    console.log("New message: ", newMessage);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected Server");
  });
});

server.listen(port, () => {
  console.log(`app listening on port${port}`);
});
