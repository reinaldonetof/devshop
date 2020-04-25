const User = require("../models/user");

const login = (db) => async (req, res) => {
  const user = await User.login(db)(req.body.email, req.body.passwd);
  res.send(user);
};

module.exports = {
  login,
};
