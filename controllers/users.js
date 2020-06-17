const db = require("../db");

exports.index = (req, res) => {
  res.render("users/index", {
    users: db.get("users").value(),
  });
};

exports.getCreateUser = (req, res) => {
  res.render("users/create");
};

exports.postCreateUser = (req, res) => {
  db.get("users").insert(req.body).write();

  res.redirect("/users");
};

exports.viewUser = (req, res) => {
  const { id } = req.params;
  const user = db.get("users").getById(id).value();

  res.render("users/view", user);
};

exports.getUpdateUser = (req, res) => {
  const { id } = req.params;
  const { name, age } = db.get("users").getById(id).value();

  res.render("users/update", { name, age });
};

exports.postUpdateUser = (req, res) => {
  const { id } = req.params;
  const { name, age } = req.body;
  db.get("users").updateById(id, { name, age }).write();

  res.redirect("/users");
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;
  db.get("users").removeById(id).write();
  
  res.redirect("/users");
};
