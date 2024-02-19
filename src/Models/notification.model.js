const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema({
  date: {
    type: String,
    require: true,
  },

  heading:{
    type : String,
    require : true
  },

  body:{
    type : String,
    require : true
  },

  readStatus : {
    type: Boolean,
    default : false,
    require : true
  }
});

const Notification = mongoose.model("LMSNotificationDataBase",notificationSchema);

module.exports = Notification;
