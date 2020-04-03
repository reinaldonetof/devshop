const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const slug = require("./utils/slug");

const db = require("knex")({
  client: "mysql2",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "devshop",
  },
});

db.on("query", (query) => {
  console.log("SQL: " + query.sql);
});

app.set("view engine", "ejs");
app.use(express.static("public"));

const getCategoryById = async (id) => {
  const category = await db("categories")
  .select("*")
  .where("id", id);
  return category;
}

const getCategories = async () => {
  const categories = await db("categories").select("*");
  const categoriesWithSlug = categories.map((category) => {
    const newCategory = { ...category, slug: slug(category.category) };
    return newCategory;
  });
  return categoriesWithSlug;
};

const getProductsByCategoryId = async (id) => {
  const products = await db("products")
    .select("*")
    .where("id", function () {
      this.select("categories_products.product_id")
        .from("categories_products")
        .whereRaw("categories_products.product_id = products.id")
        .where("category_id", id);
    });
  return products;
};

app.get("/", async (req, res) => {
  const categories = await getCategories();
  res.render("home", {
    categories,
  });
});

app.get("/categoria/:id/:slug", async (req, res) => {
  const categories = await getCategories();
  const products = await getProductsByCategoryId(req.params.id);
  const category = await getCategoryById(req.params.id)


  res.render("category", {
    products,
    categories,
    category,
  });
});

app.listen(port, (err) => {
  if (err) {
    console.log("nao foi possivel iniciador o server");
  } else {
    console.log("devshop rodando");
  }
});
