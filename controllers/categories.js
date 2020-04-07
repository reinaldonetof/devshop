const category = require("../models/category");
const product = require("../models/product");

const getCategories = db => async (req, res) => {
  const products = await product.getProductsByCategoryId(db)(req.params.id);
  const categoryById = await category.getCategoryById(db)(req.params.id);

  res.render("category", {
    products,
    category: categoryById,
  });
}

module.exports ={ 
  getCategories
}