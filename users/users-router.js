const express = require("express");

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

module.exports = router;
