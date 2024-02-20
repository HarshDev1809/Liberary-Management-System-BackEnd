
module.exports = (app)=>{
    app.post("/api/notification",[verifyToken],signUp);
    app.post("/api/auth/signin",[verifySignIn],signIn);
}