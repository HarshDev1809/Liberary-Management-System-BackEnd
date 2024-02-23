const { registerCustomer,getCustomer,issueBook } = require("../Controllers/customer.controller");
const { verifyCustomer,verifyCustomerQuery } = require("../Middlewares/customer.middleware");
const { verifyToken } = require("../Middlewares/token.middleware")

module.exports = (app)=>{
    app.post("/api/customers/register",[verifyToken,verifyCustomer],registerCustomer);
    app.get("/api/customers/user",[verifyToken,verifyCustomerQuery],getCustomer);
    app.put("/api/customers/issue",[verifyToken],issueBook); 
}