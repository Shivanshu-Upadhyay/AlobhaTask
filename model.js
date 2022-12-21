const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const csvInsert = new Schema(
  {
    Name: { type: String, required: false },
    Email: { type: String, required: true },
    Phone:{type:Number,required:true},
    Pincode:{type:Number,required:true}
  },
);

module.exports = mongoose.model("Csv",csvInsert,"csvs")