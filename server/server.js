const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const { generateMessage, generateLocationMessage } = require("./utils/message");
const {isRealString} = require('./utils/validation')

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(path.join(__dirname, "./../public")));

io.on("connection", socket => {
  console.log("Connected to Server");



  socket.on('join',(params,callback)=>{
    if(!isRealString(params.user) || !isRealString(params.room)){
      callback('Room and Display Name must be a string')
    }
    socket.emit(
      "newMessage",
      generateMessage("Admin", `Welcome ${params.user} to ChatApp Room: ${params.room}`)
    );
    socket.broadcast.to(params.room).emit(
      "newMessage",
      generateMessage("Admin", `${params.user} has joined.`)
    );
    callback()
  })

  socket.on("sendLocation", coords => {
    io.emit(
      "newLocationMessage",
      generateLocationMessage("Admin", coords.lat, coords.lng)
    );
  });

  socket.on("createMessage", (newMessage, callback) => {
    io.emit("newMessage", generateMessage(newMessage.from, newMessage.text));
    callback();
  });

  socket.on("disconnect", () => {
    console.log("Disconnected Server");
  });
});

server.listen(port, () => {
  console.log(`app listening on port${port}`);
});
