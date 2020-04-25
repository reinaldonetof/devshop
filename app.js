const init = (db) => {
  const express = require("express");
  const app = express();

  const category = require("./models/category");
  const routes = require("./routes");

  app.use(express.json({ extended: true }));
  app.use(express.urlencoded());

  app.set("view engine", "ejs");
  app.use(express.static("public"));

  //Middleware
  app.use(async (req, res, next) => {
    const categories = await category.getCategories(db)();
    res.locals = {
      categories,
    };
    next();
  });

  app.use(routes(db));

  return app;
};

module.exports = init;
