const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/TSS');

const bankSchema = mongoose.Schema({
    id:{
        type:String,
    },
    BankAcc:{
        type:String,
    },
    IFSC:{
        type:String,
    },
    AccHolder:{
        type:String,
    },
    UPIID:{
        type:String,
    }
})

const Bank = mongoose.model('Bank',bankSchema);
module.exports = {Bank};