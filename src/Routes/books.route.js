const {verifyToken} = require("../Middlewares/token.middleware");
const {verifyAdmin} = require("../Middlewares/auth.middleware");
const {verifyBook, verifyPriceQuery, verifyQuery, verifyUpdateQuery} = require("../Middlewares/book.middleware");
const { createBook,getBooks,getBookById, updateBookCount} = require("../Controllers/book.controller");

module.exports = (app)=>{
    app.post("/api/books/create",[verifyToken,verifyAdmin,verifyBook],createBook);
    app.get("/api/books",[verifyPriceQuery,verifyQuery],getBooks);
    app.get("/api/books/:id",getBookById);
    // app.put("/api/books/update",[verifyToken,verifyQuery,verifyUpdateQuery],updateBookCount);
}