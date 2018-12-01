const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const { generateMessage, generateLocationMessage } = require("./utils/message");
const { isRealString } = require("./utils/validation");
const { Users } = require("./utils/Users");

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const users = new Users();

app.use(express.static(path.join(__dirname, "./../public")));

io.on("connection", socket => {
  console.log("Connected to Server");

  socket.on("join", (params, callback) => {
    if (!isRealString(params.user) || !isRealString(params.room)) {
      return callback("Room and Display Name must be a string");
    }
    let joinedUser = { id: socket.id, user: params.user, room: params.room };
    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUsers(joinedUser);
    io.to(params.room).emit("updatedUserList", users.usersList(params.room));

    socket.emit(
      "newMessage",
      generateMessage(
        "Admin",
        `Welcome ${params.user} to ChatApp Room: ${params.room}`
      )
    );
    socket.broadcast
      .to(params.room)
      .emit(
        "newMessage",
        generateMessage("Admin", `${params.user} has joined.`)
      );
    callback();
  });

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
    removedUser = users.removeUser(socket.id);
    io
      .to(removedUser.room)
      .emit("updatedUserList", users.usersList(removedUser.room));
    io
      .to(removedUser.room)
      .emit(
        "newMessage",
        generateMessage("Admin", `${removedUser.user} has left.`)
      );
  });
});

server.listen(port, () => {
  console.log(`app listening on port${port}`);
});
