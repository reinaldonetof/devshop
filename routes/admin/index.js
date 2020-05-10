const init = (db) => {
  const categories = require("./categories");
  // const products = require("./products");

  const router = require("express").Router();

  router.use("/categoria", categories(db));
  // router.use("/produto", products(db));

  return router;
};

module.exports = init;
