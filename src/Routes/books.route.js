const {verifyToken} = require("../Middlewares/token.middleware");
const {verifyAdmin} = require("../Middlewares/auth.middleware");
const {verifyBook} = require("../Middlewares/book.middleware");
const { createBook,getBooks,getBookById} = require("../Controllers/book.controller");

module.exports = (app)=>{
    app.post("/api/books/create",[verifyToken,verifyAdmin,verifyBook],createBook);
    app.get("/api/books",getBooks);
    app.get("/api/books/:id",getBookById);
}