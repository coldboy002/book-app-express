const express = require("express");

const db = require("../db");

const router = express.Router();

// Get list users
router.get("/", (req, res) => {
  res.render("users/index", {
    users: db.get("users").value(),
  });
});

// Create a new user
router
  .route("/create")
  .get((req, res) => {
    res.render("users/create");
  })
  .post((req, res) => {
    db.get("users").insert(req.body).write();

    res.redirect("/users");
  });

// View a user
router.get("/:id/view", (req, res) => {
  const { id } = req.params;

  const user = db.get("users").getById(id).value();
  res.render("users/view", user);
});

// Update a user
router
  .route("/:id/update")
  .get((req, res) => {
    const { id } = req.params;
    const { name, age } = db.get("users").getById(id).value();
    res.render("users/update", { name, age });
  })
  .post((req, res) => {
    const { id } = req.params;
    const { name, age } = req.body;
    db.get("users").updateById(id, { name, age }).write();
    res.redirect("/users");
  });

// Delete a user
router.get("/:id/delete", (req, res) => {
  const { id } = req.params;
  db.get("users").removeById(id).write();
  res.redirect("/users");
});

module.exports = router;
