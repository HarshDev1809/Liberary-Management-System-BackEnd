const { registerCustomer,getCustomer,issueBook,getCustomerById } = require("../Controllers/customer.controller");
const { findBook } = require("../Middlewares/book.middleware");
const { verifyCustomer,verifyCustomerQuery, findCustomer } = require("../Middlewares/customer.middleware");
const { verifyToken } = require("../Middlewares/token.middleware")

module.exports = (app)=>{
    app.post("/api/customers/register",[verifyToken,verifyCustomer],registerCustomer);
    app.get("/api/customers/user",[verifyCustomerQuery],getCustomer);
    app.put("/api/customers/issue",[verifyToken,findCustomer,findBook],issueBook); 
    app.get("/api/customers/user/:id",getCustomerById);
}