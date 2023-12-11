// const mongoose = require('mongoose');
// const contactSchema=mongoose.schema{
// user_id:{
//     type:mongoose.Schema.Types.ObjectId,
//     required:true,
//     ref: "User",
// },
// {
//     name:{
//         type:String,
//         required:[true,"please add contact name"],

//     },

//     email:{
//         type:String,
//         required:[true,"please add phone number"],
//     },
// },
//    timestamps:true;

// }
// );
// module.exports = mongoose.model("Contact", contactSchema);
const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    
    name: {
      type: String,
      required: [true, "Please add the contact name"],
    },
    email: {
      type: String,
      required: [true, "Please add the contact email address"],
    },
    phone: {
      type: String,
      required: [true, "Please add the contact phone number"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);