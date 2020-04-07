const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const category = require("./models/category");
const product = require("./models/product");

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

//Middleware
app.use(async (req,res, next) => {
  const categories = await category.getCategories(db)();
  res.locals = {
    categories
  }
  next()
})


app.get("/", async (req, res) => {
  res.render("home", {
  });
});

app.get("/categoria/:id/:slug", async (req, res) => {
  const products = await product.getProductsByCategoryId(db)(req.params.id);
  const categoryById = await category.getCategoryById(db)(req.params.id);

  res.render("category", {
    products,
    category: categoryById,
  });
});

app.get("/produto/:id/:slug", async (req, res) => {
  const productId = await product.getProductById(db)(req.params.id)
  res.render("product-detail", {
    product: productId,
  });
})

app.listen(port, (err) => {
  if (err) {
    console.log("nao foi possivel iniciador o server");
  } else {
    console.log("devshop rodando");
  }
});
