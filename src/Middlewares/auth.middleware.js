const Employee = require("../Models/employee.model");
const { userTypes, requestStatus } = require("../Utils/constants");
const {
  errMessage,
  requestMessage,
  defaultPrivilegetMessage,
} = require("../Utils/messages");

const verifySignUp = async (req, res, next) => {
  const { userName, password, name, emailId, requestStatus, userType } =
    req.body;

  if (!userName) {
    return res.status(400).send({
      message: "USERNAME CAN'T BE EMPTY! PLEASE ENTER A VALID USERNAME",
    });
  }

  if (!password) {
    return res.status(400).send({
      message: "PASSWORD CAN'T BE EMPTY ! PLEASE ENTER A VALID PASSWORD",
    });
  }

  if (!name) {
    return res
      .status(400)
      .send({ message: "NAME CAN'T BE EMPTY ! PLEASE ENTER YOUR NAME" });
  }

  if (!emailId) {
    return res.status(400).send({
      message: "EMAIL ID CAN'T BE EMPTY ! PLEASE ENTER A VALID EMAIL ID",
    });
  }

  if (userType === "Admin") {
    req.body.userType = "Normal";
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

const verifySignIn = (req, res, next) => {
  const { userName, password } = req.body;
  if (!userName) {
    return res.status(400).send({message : "USERNAME CAN'T BE EMPTY!"});
  }

  if (!password) {
    return res.status(400).send({message : "PASSWORD CAN'T BE EMPTY!"});
  }

  next();
};

const verifyAdmin = (req, res, next) => {
  const user = req.user;

  if (user.userType !== userTypes.admin) {
    return res
      .status(404)
      .send({ message: "User Not Authorized. Admin Access needed" });
  } else {
    next();
  }
};

module.exports = {
  verifySignUp,
  verifySignIn,
  verifyAdmin,
};
