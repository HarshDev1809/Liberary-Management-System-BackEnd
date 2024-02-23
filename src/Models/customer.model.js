const mongoose = require("mongoose");
const customerSchema = mongoose.Schema({
    uId : {
        type : Number,
        require : true
    },

    name : {
        type : String,
        require : true
    },

    booksIssued : {
        type : [mongoose.SchemaTypes.ObjectId],
        ref : "LMSIssuedBookData",
        require : true,
        default : []
    },

    phoneNumber : {
        type : Number,
        require : true
    },

    emailId : {
        type : String,
        require : true
    },

    fine : {
        type : Number,
        require : true,
        default : 0
    }
})

const Customer = mongoose.model("LMSCustomerDataBase",customerSchema);

module.exports = Customer;