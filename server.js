const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const {DB_URL} = require("./configs/db.config")
const mongoose = require("mongoose");
const {PORT} = require("./configs/server.config")
const app = express();
const cors = require("cors");

app.use(cors())

mongoose.connect(DB_URL).then(()=>{
    console.log("Connected to DataBase");
}).catch((err)=>{
    console.log({message : err});
});

app.use(bodyParser.json());
require("./src/Routes/auth.route")(app);
require("./src/Routes/books.route")(app);
require("./src/Routes/customer.route")(app)


app.listen(PORT,()=>{
    console.log("Server Online");
});
