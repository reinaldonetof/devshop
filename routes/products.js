const init = db => {
  const router = require('express').Router()
  const products = require('../controllers/products')

  router.get("/:id/:slug", products.getProducts(db) )

  return router
}

module.exports = init