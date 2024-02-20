const Book  = require("../Models/book.model");
const { errMessage } = require("../Utils/messages");
const {BOOK_URL} = require("../../configs/book.config");

exports.createBook = async(req,res)=>{
    const {title,price,author,description,tags,edition,coverUrl} = req.body;
    let newCoverUrl = coverUrl;
    let newEdition = edition;
    if(!edition){
        newEdition = "First"
    }
    if(!coverUrl){
        newCoverUrl = BOOK_URL;
    }
    const uId = Date.now();
    const book = {
        title : title,
        price : price,
        author : author,
        uId : uId,
        description : description,
        tags : tags,
        edition : newEdition,
        coverUrl : newCoverUrl
    };
    try{
        const newBook = new Book(book);
        const response = await newBook.save();
        return res.status(201).send(book);
    }catch(err){
        console.log(err);
        return res.status(500).send(errMessage);
    }

}

exports.getBooks = async (req,res) =>{
    try{
        const books = await Book.find({});
        return res.status(200).send(books);
    }catch(err){
        console.log(err);
        return res.status(500).send(errMessage);    
    }
}

exports.getBookById = async (req,res) =>{
    const bookId = req.params.id;
    try{
        const book = await Book.findById(bookId);
        if(!book){
            return res.status(400).send({message : "Book Not Found!"});
        }else{
            return res.status(201).send(book);
        }
    }catch(err){
        return res.status(500).send(errMessage);
    }
}