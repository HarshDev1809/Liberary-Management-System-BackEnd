const Book = require("../Models/book.model");

const verifyBook = (req,res,next)=>{
    const {title,description,price,tags,author} = req.body;
    if(!title){
        return res.status(400).send({message:"Please Enter Name of the Book!"});
    }
    if(!description){
        return res.status(400).send({message:"Please Enter Description of the Book!"});
    }
    if(!price){
        return res.status(400).send({message : "Please Enter Price of the Book!"});
    }
    if(price <= 0){
        return res.status(400).send({message : "Invalid Book Price!"});
    }
    if(!tags || !tags.length){
        return res.status(400).send({message : "Please Enter Tags of the Book!"});
    }
    if(!author){
        return res.status(400).send({message : "Please Enter the Author of the Book!"});
    }

    next();
}

module.exports = {
    verifyBook
}