const {todayDate} = require("./date");

const errMessage = {
    message : "Something Went Wrong!"
}

const requestMessage = {
    pending : "Request Pending. Waiting For Authorization.",
    approved : "Request Approved.",
    decline : "Request Declined.",
    finished : "Request Already Approved."
}

const defaultPendingMessage = {
    date : todayDate(),
    heading : "Request Pending.",
    body : "Request is Pending. Waiting for Authorization approved by Admin. Kindly contact Admin."
}

const welcomeMessage = {
    date : todayDate(),
    heading : "Welcome!",
    body : "Welcome!"
}

const defaultPrivilegetMessage = {
    date : todayDate(),
    heading : "Admin Sign In Denied!",
    body : "Sign In as Admin Denied. Kindly request for Admin Role."
}

module.exports = {
errMessage,
requestMessage,
defaultPendingMessage,
welcomeMessage,defaultPrivilegetMessage
}