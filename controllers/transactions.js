const db = require("../db");

exports.index = (req, res) => {
  const transactions = db
    .get("transactions")
    .reduce((result, transaction) => {
      const { userId, bookId } = transaction;
      const book = db.get("books").getById(bookId).value();
      const user = db.get("users").getById(userId).value();
      result.push({ ...transaction, book: book, user: user });
      return result;
    }, [])
    .value();

  res.render("transactions/index", { transactions });
};

exports.getCreateTransaction = (req, res) => {
  res.render("transactions/create", {
    users: db.get("users").value(),
    books: db.get("books").value(),
  });
};

exports.postCreateTransaction = (req, res) => {
  const { user, book } = req.body;
  const findUser = db.get("users").find({ name: user }).value();
  const findBook = db.get("books").find({ title: book }).value();
  db.get("transactions")
    .insert({ userId: findUser.id, bookId: [].concat(findBook.id) })
    .write();

  res.redirect("/transactions");
};

exports.deleteTransaction = (req, res) => {
  const { id } = req.params;
  db.get("transactions").updateById(id, { isComplete: true }).write();

  res.redirect("/transactions");
};
