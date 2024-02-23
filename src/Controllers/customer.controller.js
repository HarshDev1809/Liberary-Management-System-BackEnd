const Book = require("../Models/book.model");
const Customer = require("../Models/customer.model");
const IssuedBookInfo = require("../Models/issued.book.model");
const { errMessage } = require("../Utils/messages");

exports.registerCustomer = async(req,res) =>{
    const {name,phoneNumber,emailId} = req.body;
    const uId = Date.now();

    try{
        const newCustomer = new Customer({
            name : name,
            phoneNumber : phoneNumber,
            emailId : emailId,
            uId : uId,
            booksIssued : [],
            fine : 0
        });

        const response = await newCustomer.save();
        return res.status(201).send(response);
    }catch(err){
        console.log(err);
        return res.status(500).send(errMessage);
    }
};

exports.getCustomer = async(req,res)=>{
    const query = req.newQuery;
    try{
        const customer = await Customer.find(query);
        if(!customer.length){
            return res.status(400).send({message : "Customers Not Found!"});
        }else{
            return res.status(200).send(customer)
        }
    }catch(err){
        console.log(err);
        return res.status(500).send(errMessage);
    }
}

exports.issueBook = async(req,res)=>{
    const {issueDate, returnDate} = req.body;
    const customer = req.customer;
    const customerId = customer.uId;
    const book = req.book;
    const employeeId = req.user._id
    const bookId = book.UId;

    try{
        const newIssueBook = new IssuedBookInfo({
            customerId : customer.uId,
            uId : book.uId,
            issueDate : issueDate,
            returnDate : returnDate,
            fine : 0,
            issuedBy : employeeId
        });

        const response = await newIssueBook.save();
        const updatedIssuedList = book.issuedTo.push(customer._id);
        const updatedIssueListCustomer = customer.booksIssued.push(response._id);

        await Book.finOneAndUpdate({uId : bookId},{issuedTo : updatedIssuedList}, {new : true})
        await Customer.finOneAndUpdate({uId : customerId},{booksIssued : updatedIssueListCustomer},{new:true});
        return res.status(201).send(response);

    }catch(err){
        console.log(err);
        return res.status(500).send(errMessage);
    }
}
