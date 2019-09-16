const express = require("express");
const bcrypt = require("bcryptjs");
const users = require("./users.model");

const router = express.Router();

router.get("/", (req, res) => {
  users
    .find()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({ error: "Error in GETTING users" });
    });
});

router.post("/", (req, res) => {
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

module.exports = router;
