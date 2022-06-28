const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({

    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ],
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
      length:8
    },
    montant:{
      type:Number,
      default:0
    },
    type:{
      type:String,
      required:true
    },
    password:{
      type:String,
      required:true
    }

  },
  {
    timestamps: true,
  })
);

module.exports = User;
