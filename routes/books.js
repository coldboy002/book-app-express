const express = require("express");
const router = express.Router();

const db = require("../db");

/* GET books listing. */
router.get("/", (req, res) => {
  res.render("books/index", { books: db.get("books").value() });
});

// Create books
router
  .route("/create")
  .get((req, res) => {
    res.render("books/create");
  })
  .post((req, res) => {
    db.get("books").insert(req.body).write();

    res.redirect("/books");
  });

router
  .get("/:id/view",(req, res)=>{
    const { id } = req.params;
    const { title, description } = db.get("books").getById(id).value();
    
    res.render("books/view", { title, description });
  })

// Update  books infor
router
  .route("/:id/update")
  .get( (req, res) => {
    const { id } = req.params;
    const { title, description } = db.get("books").getById(id).value();

    res.render("books/update", { title, description });
  })
  .post((req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    db.get("books").updateById(id, { title, description }).write();

    res.redirect("/books");
  });

// Delete a book
router.get("/:id/delete", (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  db.get("books").removeById(id).write();

  res.redirect("/books");
});

module.exports = router;
