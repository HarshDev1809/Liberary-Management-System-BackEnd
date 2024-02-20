const mongoose = require("mongoose");
const { userTypes, requestStatus } = require("../Utils/constants");

const employeeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  userName: {
    type: String,
    required: true,
    minLength: 4,
  },

  emailId: {
    type: String,
    require: true,
  },

  password: {
    type: String,
    require: true,
  },

  userType: {
    type: String,
    require: true,
    default: userTypes.normal,
    enum: userTypes,
  },

  requestStatus: {
    type: String,
    require: true,
    default: requestStatus.nil,
    enum: requestStatus,
  },
  
});

const Employee = mongoose.model("LMSEmployeeDataBase", employeeSchema);

module.exports = Employee;
