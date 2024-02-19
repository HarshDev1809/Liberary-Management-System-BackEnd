const Employee = require("../Models/employee.model");
const bcrypt = require("bcrypt");
const {todayDate, todayDate} = require("../Utils/date");

exports.signUp = async(req,res) => {
    const {userName, password,emailId,name,userType, requestStatus} = req.body;
    const {notificationHeading, notificationBody} = req.body;
    const todayDate = todayDate();

    try{
        const hashedPassword = bcrypt.hashSync(password,10);
        const newEmployee = new Employee({
            userName : userName,
            password : hashedPassword,
            name : name,
            userType : "Normal",
            
        })
    }
}