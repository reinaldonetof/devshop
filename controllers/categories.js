const category = require("../models/category");
const product = require("../models/product");

const getCategories = (db) => async (req, res) => {
  const products = await product.getProductsByCategoryId(db)(req.params.id);
  const categoryById = await category.getCategoryById(db)(req.params.id);

  res.render("category", {
    products,
    category: categoryById,
  });
};

const adminGetCategories = (db) => async (req, res) => {
  const categories = await category.getCategories(db)();
  res.render("admin/categories/index", {
    categories,
  });
};

const adminCreateCategory = (db) => async (req, res) => {
  if (req.method === "GET") {
    res.render("admin/categories/create", {
      form: {},
      errors: [],
    });
  } else {
    try {
      await category.createCateogry(db)(req.body);
      res.redirect("/admin/categorias");
    } catch (err) {
      res.render("admin/categories/create", {
        form: req.body,
        errors: err.errors.fields,
      });
    }
  }
};

const adminRemoveCategory = (db) => async (req, res) => {
  await category.removeCategory(db)(req.params.id);
  res.redirect("/admin/categorias");
};

const adminUpdateCategory = (db) => async (req, res) => {
  if (req.method === "GET") {
    const cat = await category.getCategoryById(db)(req.params.id);
    res.render("admin/categories/update", {
      form: cat[0],
      errors: [],
    });
  } else {
    try {
      await category.updateCategory(db)(req.params.id, req.body);
      res.redirect("/admin/categorias");
    } catch (err) {
      res.render("admin/categories/update", {
        form: req.body,
        errors: err.errors.fields,
      });
    }
  }
};

module.exports = {
  getCategories,
  adminGetCategories,
  adminCreateCategory,
  adminRemoveCategory,
  adminUpdateCategory,
};
