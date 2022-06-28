const mongoose = require("mongoose");

const Material = mongoose.model(
  "Materiel",
  new mongoose.Schema({

    name:{
        type: String,
        required: true
    },
    price:{
        type:Number,
        required:[true, "please enter material price"],
        maxlength: [5,"price cannot exceed 5 caracters"],
        required: true
    }
  })
);

module.exports = Material;