const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users")

// Get list users
router.get("/", usersController.index);

// Create a new user
router
  .route("/create")
  .get(usersController.getCreateUser)
  .post(usersController.postCreateUser);

// View a user
router.get("/:id/view", usersController.viewUser);

// Update a user
router
  .route("/:id/update")
  .get(usersController.getUpdateUser)
  .post(usersController.postUpdateUser);

// Delete a user
router.get("/:id/delete",usersController.deleteUser);

module.exports = router;
