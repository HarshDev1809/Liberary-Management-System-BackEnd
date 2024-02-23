const Employee = require("../Models/employee.model");
const bcrypt = require("bcrypt");
const { todayDate } = require("../Utils/date");
const {
  welcomeMessage,
  errMessage,
  defaultPrivilegetMessage,
} = require("../Utils/messages");
const { userTypes } = require("../Utils/constants");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../../configs/auth.config");

exports.signUp = async (req, res) => {
  const { userName, password, emailId, name, userType, requestStatus } =
    req.body;

  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const token = jwt.sign({ userName: userName }, SECRET, { expiresIn: "1h" });
    const newEmployee = new Employee({
      userName: userName,
      password: hashedPassword,
      name: name,
      userType: userType,
      requestStatus: requestStatus,
      emailId: emailId,
    });

    await newEmployee.save();

    const response = {
      acessToken: token,
      userName: userName,
      name: name,
    };
    return res.status(201).send(response);
  } catch (err) {
    console.log(err);
    return res.status(500).send(errMessage);
  }
};

exports.signIn = async (req, res) => {
  const { userName, password } = req.body;
  try {
    const user = await Employee.findOne({
      userName: userName,
    });

    if (!user) {
      return res.status(400).send({ message: "Wrong UserName" });
    } else {
      const isValid = bcrypt.compareSync(password, user.password);
      if (isValid) {
        const token = jwt.sign({ userName: user.userName }, SECRET, {
          expiresIn: "1h",
        });
        const response = {
          userName: user.userName,
          name: user.name,
          accessToken: token,
        };
        return res.status(200).send(response);
      } else {
        return res.status(400).send({ message: "Wrong Password" });
      }
    }
  } catch (err) {
    return res.status(500).send(errMessage);
  }
};
