const Customer = require("../Models/customer.model");
const { errMessage } = require("../Utils/messages");

const verifyCustomer = async (req,res,next)=>{
    const {name,phoneNumber,emailId} = req.body

    if(!name){
        return res.status(400).send({message : "Please Enter a name!"});
    }
    if(!phoneNumber){
        return res.status(400).send({message : "Please Enter a Phone Number!"});
    }
    if(!emailId){
        return res.status(400).send({message : "Please Enter an Email Id!"});
    }

    try{
        const customer = await Customer.find({
            $and: [{name:name},{phoneNumber : phoneNumber},{emailId : emailId}]
        });
        if(customer.length){
            return res.status(400).send({message : "Customer Already Exist!"});
        }else{
            next();
        }
    }catch(err){
        return res.status(500).send(errMessage);
    }
}

const verifyCustomerQuery = async(req,res,next)=>{
    const {name,phoneNumber,emailId} = req.query;
    const query = {};

    if(name){
        query.name = name;
    }
    if(phoneNumber){
        query.phoneNumber = phoneNumber;
    }
    if(emailId){
        query.emailId = emailId;
    }
    req.newQuery = query;
}
module.exports = {
    verifyCustomer,
    verifyCustomerQuery
}