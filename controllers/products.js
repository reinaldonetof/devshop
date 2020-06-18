const init = (db) => {
  const product = require("../models/product")(db);

  const getProducts = async (req, res) => {
    const productId = await product.getProductById(req.params.id);
    res.render("product-detail", {
      product: productId,
    });
  };
  return {
    getProducts,
  };
};

module.exports = init;
