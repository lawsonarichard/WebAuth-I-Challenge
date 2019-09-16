const express = require("express");
const helmet = require("helmet");
// routers

const usersRouter = require("./users/users-router");

const server = express();

server.use(express.json());
server.use(helmet());
server.use("/api/", usersRouter);

server.get("/", (req, res) => {
  res.json({ message: "Welcome" });
});

module.exports = server;
