const express = require("express");
const socket = require("socket.io");
// const session = require("express-session");
// const passport = require("passport");
// require("./auth");
const cors = require("cors");
const http = require("http");
require("dotenv").config();
const PORT = process.env.PORT;
const { v4 } = require("uuid");
const app = express();
app.use(cors());
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: "false",
//     saveUninitialized: "true",
//   })
// );

// app.use(passport.initialize());
// app.use(passport.session());
const server = http.createServer(app);
const io = new socket.Server(server, {
  cors: {
    methods: ["POST", "GET"],
  },
});
app.use(express.json());
// app.get(
//   "/google/auth",
//   passport.authenticate("google", { scope: ["email", "profile"] }),
//   (req, res) => {
//     res.send({
//       message: "sucessfull",
//     });
//   }
// );
app.get("/join-room", (req, res) => {
  const temp = v4();
  res.send({
    roomId: temp,
  });
});

io.on("connection", (socket) => {
  console.log("sucessfully connected to socket id :", socket.id);
  socket.on("join-room", (data) => {
    console.log(data);
    socket.join(data.roomId);
    socket.to(data.roomId).emit("user-connected", data);
  });
  socket.on("disconnect", () => {
    console.log("socket -disconnected");
  });
});
server.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`server running sucessfully at port: ${PORT}`);
});
