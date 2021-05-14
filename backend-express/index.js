const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { syncState } = require("./syncState");

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  },
});

var settings = {
  section1: {
    param1: "",
    param2: "",
    param3: "",
  },
  section2: {
    param1: "",
    param2: "",
    param3: "",
    nesteObject: {
      param1: "",
      list1: [],
    },
  },
};

io.on("connection", (socket) => {
  console.log("a user connected");

  io.emit("initial_settings", settings);

  socket.on("settings_update", ({ namespace, value }) => {
    console.log({ namespace, value });
    settings = syncState(settings, namespace, value);
    socket.broadcast.emit("settings_update", settings);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
