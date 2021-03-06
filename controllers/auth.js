const User = require("../models/user");

const login = (db) => async (req, res) => {
  try {
    const user = await User.login(db)(req.body.email, req.body.passwd);
    req.session.user = user;
    res.redirect("/");
  } catch (err) {
    res.send("Error " + err);
  }
};

const logout = (req, res) => {
  req.session.destroy(() => {});
  res.redirect("/");
};

module.exports = {
  login,
  logout,
};
