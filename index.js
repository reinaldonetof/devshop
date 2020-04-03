const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const slug = require('./utils/slug')

const db = require('knex')({
  client: 'mysql2',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'devshop'
  }
})

db.on('query', query => {
  console.log('SQL: ' + query.sql)
})

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get('/', async (req,res) => {
  const categories = await db('categories').select('*')
  const categoriesWithSlug = categories.map( category => {
    const newCategory = { ...category, slug: slug(category.category)}
    return newCategory
  })
  res.render('home', {
    categories: categoriesWithSlug
  })
})

app.get('/categoria/:id/:slug', async (req, res) => {
  const categories = await db('categories').select('*')
  
  const products = await db('products').select('*').where('id', function() {
    this.select("categories_products.product_id")
      .from("categories_products")
      .whereRaw("categories_products.product_id = products.id")
      .where("category_id", req.params.id);
  })
  
  const categoriesWithSlug = categories.map( category => {
    const newCategory = { ...category, slug: slug(category.category)}
    return newCategory
  })
  
  const category = await db("categories")
    .select("*")
    .where("id", req.params.id);
  
    res.render('category', {
    products,
    categories: categoriesWithSlug,
    category
  })
})

app.listen(port, err => {
  if(err) {
    console.log('nao foi possivel iniciador o server')
  } else {
    console.log('devshop rodando')
  }
});
