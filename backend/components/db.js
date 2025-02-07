const mongoose = require("mongoose");
const { Stock } = require("./stocksdb");
const { object } = require("zod");
mongoose.connect("mongodb://localhost:27017/TSS");

const otpSchema = mongoose.Schema({
    userPhone:{
        type:String,
        required:true
    },

    otp:{
        type:String,
        required: true
    },
    otpExpiration :{
        type:Date,
        default:Date.now,
        get: (otpExpiration) => otpExpiration.getTime(),
        set: (otpExpiration) => new Date(otpExpiration)
    }
    
})

const userSchema = mongoose.Schema({
    userId:{
        type:String,
        require:true

    },
    userName:{
        type:String,
        required: true
    },
    userPhone: {
        type:String,
        required: true
    },
    userEmail:String,
    // password:{
    //     type:String,
    //     required:true
    // },
    watchlist: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Stock', // Reference to the Stock model
        }
    ]
});
   


const User = mongoose.model('User',userSchema);
const Otp = mongoose.model('Opt',otpSchema);
module.exports=({
    User,Otp
})
