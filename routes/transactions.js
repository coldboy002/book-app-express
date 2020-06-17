const express = require("express");
const router = express.Router();

const transactionsController = require("../controllers/transactions");

router.get("/", transactionsController.index);

router
  .route("/create")
  .get(transactionsController.getCreateTransaction)
  .post(transactionsController.postCreateTransaction);

router.get("/:id/complete", transactionsController.deleteTransaction);

module.exports = router;
