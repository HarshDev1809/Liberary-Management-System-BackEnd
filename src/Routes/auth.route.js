const {verifySignUp,verifySignIn} = require("../Middlewares/auth.middleware");
const {signUp,signIn} = require("../Controllers/auth.controller");

module.exports = (app)=>{
    app.post("/api/auth/signup",[verifySignUp],signUp);
    app.post("/api/auth/signin",[verifySignIn],signIn);
}