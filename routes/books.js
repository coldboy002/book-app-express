const express = require("express");
const router = express.Router();

const booksController = require('../controllers/books')

/* GET books listing. */
router.get("/",booksController.index);

// Create a new book
router
  .route("/create")
  .get(booksController.getCreateBook)
  .post(booksController.postCreateBook);

// View a book
router
  .get("/:id/view",booksController.viewBook)

// Update  books infor
router
  .route("/:id/update")
  .get( booksController.getUpdateBook)
  .post(booksController.postUpdateBook);

// Delete a book
router.get("/:id/delete", booksController.deleteBook);

module.exports = router;
