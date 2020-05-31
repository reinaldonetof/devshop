const init = (db) => {
  const router = require("express").Router();
  const categories = require("../../controllers/categories");

  router.get("/", categories.adminGetCategories(db));

  router.get("/nova", categories.adminCreateCategory(db));
  router.post("/nova", categories.adminCreateCategory(db));

  router.get("/editar", categories.adminUpdateCategory(db));
  router.post("/editar", categories.adminUpdateCategory(db));

  router.get("/excluir/:id", categories.adminRemoveCategory(db));
  return router;
};

module.exports = init;
