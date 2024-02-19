const Employee = require("../Models/employee.model");
const Notification = require("../Models/notification.model");
const { userType, requestStatus } = require("../Utils/constants");
const {errMessage,requestMessage,defaultPrivilegetMessage} = require("../Utils/messages");

const verifySignUp = async (req, res, next) => {
  const { userName, password, name, emailId, requestStatus } = req.body;

  if (!userName) {
    return res
      .status(400)
      .send({
        message: "USERNAME CAN'T BE EMPTY! PLEASE ENTER A VALID USERNAME",
      });
  }

  if (!password) {
    return res
      .status(400)
      .send({
        message: "PASSWORD CAN'T BE EMPTY ! PLEASE ENTER A VALID PASSWORD",
      });
  }

  if (!name) {
    return res
      .status(400)
      .send({ message: "NAME CAN'T BE EMPTY ! PLEASE ENTER YOUR NAME" });
  }

  if (!emailId) {
    return res
      .status(400)
      .send({
        message: "EMAIL ID CAN'T BE EMPTY ! PLEASE ENTER A VALID EMAIL ID",
      });
  }

  if(userType === "Admin" && requestStatus !== "Pending"){
    req.body.notificationHeading = defaultPrivilegetMessage.heading;
    req.body.notificationbody = defaultPrivilegetMessage.body;
    req.body.userType = "Normal"
    req.body.requestStatus = "Pending";
  }

  try {
    const user = await Employee.find({
      $or: [{ userName: userName }, { emailId: emailId }],
    });
    if (user.length) {
      return res
        .status(400)
        .send({ message: "USERNAME OR EMAIL ID ALREADY TAKEN" });
    } else {
      next();
    }
  } catch (err) {
    return res.status(500).send(errMessage);
  }
};

module.exports = {
    verifySignUp,
}

