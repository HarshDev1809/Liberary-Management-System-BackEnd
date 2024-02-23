const mongoose = require("mongoose");
const {bookTags} = require("../Utils/constants");

const bookSchema = mongoose.Schema({
    title:{
        type: String,
        require: true
    },
    price:{
        type: Number,
        require: true
    },
    author:{
        type: String,
        require: true
    },
    uId:{
        type: Number,
        require : true
    },
    description:{
        type: String,
        require: true
    },
    tags:{
        type:[String],
        require:true,
        enum : bookTags
    },
    edition:{
        type: String,
        default : "First"
    },
    coverUrl:{
        type: String,
        require : true,
        default : "https://www.pngitem.com/pimgs/m/665-6651267_book-logo-png-book-logo-png-hd-transparent.png"
    },
    bookCount : {
        type : Number,
        require : true,
        default : 1
    },
    issuedTo : {
        type:[mongoose.SchemaTypes.ObjectId],
        require : true,
        ref : "LMSCustomerDataBase",
        default : []
        }
})

const Book = mongoose.model("LMSBooksDataBase",bookSchema);

module.exports = Book;
