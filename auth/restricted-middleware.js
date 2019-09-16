const bcrypt = require("bcryptjs");
const users = require("../users/users-model");
module.exports = function restricted(req, res, next) {
  const { username, password } = req.headers;
  if (username && password) {
    users
      .findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          next();
        } else {
          res.status(401).json({ error: "Invalid Credentials, try again" });
        }
      });
  } else {
    res.status(401).json({ error: "You shall not pass!" });
  }
};
