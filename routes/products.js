const init = (db) => {
  const router = require("express").Router();
  const products = require("../controllers/products")(db);

  router.get("/:id/:slug", products.getProducts);

  return router;
};

module.exports = init;
