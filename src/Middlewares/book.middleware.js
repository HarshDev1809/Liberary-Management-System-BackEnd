const Book = require("../Models/book.model");
const { errMessage } = require("../Utils/messages");
const { BOOK_URL } = require("../../configs/book.config");

const verifyBook = async (req, res, next) => {
  const {
    title,
    description,
    price,
    tags,
    author,
    edition,
    bookCount,
    coverUrl,
  } = req.body;
  if (!title) {
    return res.status(400).send({ message: "Please Enter Name of the Book!" });
  }
  if (!description) {
    return res
      .status(400)
      .send({ message: "Please Enter Description of the Book!" });
  }
  if (!price) {
    return res.status(400).send({ message: "Please Enter Price of the Book!" });
  }
  if (price <= 0) {
    return res.status(400).send({ message: "Invalid Book Price!" });
  }
  if (!tags || !tags.length) {
    return res.status(400).send({ message: "Please Enter Tags of the Book!" });
  }
  if (!author) {
    return res
      .status(400)
      .send({ message: "Please Enter the Author of the Book!" });
  }
  if (!bookCount) {
    req.body.bookCount = 1;
  }
  if (!edition) {
    req.body.edition = "First";
  }
  if (!coverUrl) {
    req.body.coverUrl = BOOK_URL;
  }

  try {
    const response = await Book.find({
      $and: [
        { title: req.body.title },
        { author: req.body.author },
        { edition: req.body.edition },
      ],
    });
    console.log(response);
    if (response.length == 0) {
      next();
    } else {
      return res.status(400).send({ message: "Book already Exist!" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send(errMessage);
  }
};

const verifyPriceQuery = (req, res, next) => {
  const { minPrice, maxPrice } = req.query;
  if (minPrice && maxPrice) {
    if (minPrice > maxPrice) {
      return res
        .status(400)
        .send({
          messgae: "Minimun Price can't be greater than Maximum Price!",
        });
    }
  }
  next();
};

const verifyQuery = (req, res, next) => {
  const { title, author, tags, price, uId, minPrice, maxPrice } = req.query;
  const query = {};

  if (title) {
    query.title =title;
  }
  if (author) {
    query.author = author;
  }
  if (tags) {
    query.tags = {
      $all: tags,
    };
  }
  if (price) {
    query.price = price;
  }
  if (uId) {
    query.uId = uId;
  }
  if (minPrice) {
    query.price = {
      $gte: minPrice,
    };
  }
  if (maxPrice) {
    query.price = {
      $lte: maxPrice,
    };
  }
  req.newQuery = query;
  next();
};

const verifyUpdateQuery = (req,res,next)=>{
    // console.log(req.newQuery);
    if(Object.keys(req.newQuery).length > 0){
        next();
    }else{
        return res.status(400).send({message : "Search with Valid Parameters!"});
    }
}

module.exports = {
  verifyBook,
  verifyPriceQuery,
  verifyQuery,
  verifyUpdateQuery
};
