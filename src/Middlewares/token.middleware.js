const jwt = require("jsonwebtoken");
const Employee = require("../Models/employee.model");
const {SECRET} = require("../../configs/auth.config");
const {errMessage} = require("../Utils/messages");

const verifyToken = async(req,res,next)=>{
    const token = req.headers['x-access-token'];
    if(!token){
        return res.status(400).send({message : "Token not proviede"});
    }else{
        jwt.verify(token,SECRET,async(err,payload)=>{
            if(err){
                return res.status(400).send({message : "User not Authenticated"});
            }else{
                const userName = payload.userName;
                try{
                    const user = await Employee.findOne({userName : payload.userName})
                    req.user = user;
                    next();
                }catch(err){
                    return res.status(500).send(errMessage);
                }
            }
        });
    }
}

module.exports = {
    verifyToken
}