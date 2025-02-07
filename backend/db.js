const mongoose = require ('mongoose');
mongoose.connect("mongodb://localhost:27017/TSS");



// const userSchema = mongoose.schema( {
//     UserName:String,
//     UserPhone:Number,
//     userEmail:String,
//     Orders:Number,

//     // watchlish:String,
//     // userPin:Number,
//     // Notification:String,
//     // joining_date:Date
// });

// const stockSchema = require.schema({
//     CompanyName:String,
//     sector:String,
//     price:Number,
//     CompanyFinance:Number,
//     lot_Size:Number,
//     market_Capital:Number

// });

// const fundamentalSchemas = mongoose.schema({
//     about:String,
//     BoardOfDirector:String,
//     SeniorManager:String,
//     faq:String
// });

// const orderSchemas = mongoose.schema({
//     orderID:String,
//     clientID:String,
//     order_Val:Number,
//     isseueDate:Date,
//     closeDate:Date
// })

// const User=mongoose.model('User',userSchema);

// module.exports=({
//     User
// });