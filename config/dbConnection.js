// const mongoose =require("mongoose");
// const connectDb=async()=>{
//     try{
//       const connect=await mongoose.connect(mongodb://localhost:27017);
//     }
//     catch(err){
//         console.log(err);
//     }
// };
// module.exports=connectDb;
const mongoose = require('mongoose');

const connectDb = async () => {
  try {
    const connect = await mongoose.connect('mongodb://127.0.0.1:27017/User', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
  }
};

module.exports = connectDb;
