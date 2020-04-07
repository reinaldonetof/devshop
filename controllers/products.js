const product = require("../models/product");

const getProducts = db => async (req, res) => {
  const productId = await product.getProductById(db)(req.params.id)
  res.render("product-detail", {
    product: productId,
  });
}

module.exports = {
  getProducts
}