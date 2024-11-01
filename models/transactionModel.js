const mongoose = require("mongoose");

const transactionSchema  = new mongoose.Schema({
    userid:{
        type:String,
        required: true
    },
    amount:{
        type:Number,
        required:[true, 'Amount is required'],
    },
    type:{
        type:String,
        required:[true, 'types is required'],
    },
    category:{
        type:String,
        required:[true, 'Category is required'],
    },
    reference:{
        type:String,
    },
    description:{
        type:String,
        require:[true, 'Description is required']
    },
    date:{
        type:String,
        required:[true, 'date is required']
    }
}, {timestamps:true})
const transactionModel = mongoose.model('transactions', transactionSchema)
module.exports = transactionModel;