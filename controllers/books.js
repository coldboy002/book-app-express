const db = require("../db");

exports.index = (req, res) => {
  res.render("books/index", { books: db.get("books").value() });
};

exports.getCreateBook = (req, res) => {
  res.render("books/create");
};

exports.postCreateBook = (req, res) => {
  db.get("books").insert(req.body).write();

  res.redirect("/books");
};

exports.viewBook = (req, res) => {
  const { id } = req.params;
  const { title, description } = db.get("books").getById(id).value();

  res.render("books/view", { title, description });
};

exports.getUpdateBook = (req, res) => {
  const { id } = req.params;
  const { title, description } = db.get("books").getById(id).value();

  res.render("books/update", { title, description });
};

exports.postUpdateBook = (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  db.get("books").updateById(id, { title, description }).write();

  res.redirect("/books");
};

exports.deleteBook = (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  db.get("books").removeById(id).write();

  res.redirect("/books");
};
