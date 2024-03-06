const Book = require("../Models/book.model");
const { errMessage } = require("../Utils/messages");

exports.createBook = async (req, res) => {
  const {
    title,
    price,
    author,
    description,
    tags,
    edition,
    coverUrl,
    bookCount,
  } = req.body;

  const uId = Date.now();
  const book = {
    title: title,
    price: price,
    author: author,
    uId: uId,
    description: description,
    tags: tags,
    edition: edition,
    coverUrl: coverUrl,
    bookCount: bookCount,
  };
  try {
    const newBook = new Book(book);
    const response = await newBook.save();
    return res.status(201).send(book);
  } catch (err) {
    console.log(err);
    return res.status(500).send(errMessage);
  }
};

exports.getBooks = async (req, res) => {
  const query = req.newQuery;
  try {
    const books = await Book.find(query);
    if (!books.length) {
      return res.status(400).send({ message: "No Books Available!" });
    } else {
      return res.status(200).send(books);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send(errMessage);
  }
};

exports.getBookById = async (req, res) => {
  const bookId = req.params.id;
  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(400).send({ message: "Book Not Found!" });
    } else {
      return res.status(200).send(book);
    }
  } catch (err) {
    return res.status(500).send(errMessage);
  }
};

exports.updateBookDetails = async (req, res) => {
  const query = req.params.id;
  const newUpdate = req.body;
  try {
    const response = await Book.findOneAndUpdate({_id : query}, newUpdate, {
      new: true,
    });
    if (!response) {
      return res.status(400).send({ message: "No Book Available!" });
    } else {
      return res.status(200).send(response);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send(errMessage);
  }
};