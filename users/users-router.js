const express = require("express");
const bcrypt = require("bcryptjs");
const users = require("./users-model");

const router = express.Router();

router.get("/users", (req, res) => {
  users
    .find()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({ error: "Error in GETTING users" });
    });
});

router.post("/register", (req, res) => {
  let user = req.body;

  const hash = bcrypt.hashSync(user.password);
  user.password = hash;
  users
    .add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json({ error: "Cannot add user" });
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;
  users
    .findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ error: "Invalid Credentials, try again" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});
module.exports = router;
