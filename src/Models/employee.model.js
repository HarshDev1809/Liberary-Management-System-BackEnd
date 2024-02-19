const mongoose = require("mongoose");
const { userType, requestStatus } = require("../Utils/constants");

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
    default: userType.normal,
    enum: userType,
  },

  requestStatus: {
    type: String,
    require: true,
    default: requestStatus.pending,
    enum: requestStatus,
  },

  userNotification: {
    type: [mongoose.Schema.ObjectId],
    require: true,
    default: [],
  }
  
});

const Employee = mongoose.model("LMSEmployeeDataBase", employeeSchema);

module.exports = Employee;
