const mongoose = require("mongoose");

const issuedBookInfoSchema = mongoose.Schema({

    customerId : {
        type : Number,
        require : true
    },

    uId : {
        type : String,
        require : true
    },

    issueDate : {
        type : String,
        require : true,
    },

    returnDate : {
        type : String,
        require : true
    },

    fine : {
        type : Number,
        require : true,
        default : 5
    },

    issuedBy : {
        type : String,
        rquire : true,
        default : ""
    }
})

const IssuedBookInfo = mongoose.model("LMSIssuedBookData",issuedBookInfoSchema);

module.exports = IssuedBookInfo;