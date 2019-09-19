const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);
const dbConnection = require("./data/db-config");
// routers
const authRouter = require("./auth/auth-router");
const usersRouter = require("./users/users-router");

const server = express();

const sessionConfig = {
  name: "cat", // would name the cookid sid by default
  secret: process.env.SESSION_SECRET || "keep it secret, keep it safe",
  cookie: {
    maxAge: 1000 * 60 * 60, // in milliseconds
    secure: false, // true means only send cookie over https
    httpOnly: true // true means JS has no access to the cookie
  },
  resave: false,
  saveUninitialized: true, // GDPR compliance
  store: new KnexSessionStore({
    knex: dbConnection,
    createTable: true,
    tablename: "knexsessions",
    sidfieldname: "sessionid",
    clearInterval: 1000 * 60 * 30
  })
};

server.use(express.json());
server.use(helmet());
server.use(
  cors({
    credentials: true,
    origin: "http://localhost:5000"
  })
);
server.use(session(sessionConfig));
// PUT BEFORE ROUTER
server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);

server.get("/", (req, res) => {
  res.json({ message: "Welcome" });
});

module.exports = server;
