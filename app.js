const init = (db) => {
  const session = require("express-session");
  const express = require("express");
  const app = express();

  const category = require("./models/category");
  const routes = require("./routes");

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.set("view engine", "ejs");
  app.use(express.static("public"));

  app.use(
    session({
      secret: "DevShop",
      name: "sessionId",
    })
  );
  //Middleware
  app.use(async (req, res, next) => {
    const categories = await category.getCategories(db)();
    const { user } = req.session;
    res.locals = {
      categories,
      user,
    };
    next();
  });

  app.use(routes(db));

  return app;
};

module.exports = init;
