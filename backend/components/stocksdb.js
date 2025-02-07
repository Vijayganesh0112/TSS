const mongoose = require('mongoose');
const { number } = require('zod');
mongoose.connect("mongodb://localhost:27017/TSS");

const priceSchema = mongoose.Schema({
    date:{
        type:Date,
        required:true
    }

})

const stockSchema = mongoose.Schema({
    companyName:{
        type:String,
        required:true
    },
    stockPrice:[priceSchema],
    marketCap:{
        type:Number,
        required:true
    },
    peRatio:{
        type:Number,
        required:true
    },
    pbRatio:{
        type:Number,
        required:true
    },
    debtToEquaty:{
        type:Number,
        required:true
    },
    highLow: {
        type:Number,
        require:true
    },

    roe:{
        type:Number,
        required:true
    },
    profitLossStatementurl:{
        type:String,
        createdDate:Date.now
    },
    balanceSheerurl:{
        type:String,
        createdDate:Date.now
    },
    annualreporturl:[{
        type:String

    }]

})

const Stock = mongoose.model("Stock",stockSchema);
module.exports = {
    Stock
}