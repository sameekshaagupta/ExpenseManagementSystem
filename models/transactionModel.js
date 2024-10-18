const mongoose = require("mongoose");

const transactionSchema  = new mongoose.Schema({
    amount:{
        type:number,
        required:[true, 'Amount is required'],
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
        require:[true, 'date is required']
    }
}, {timestamps:true})
const transactionModel = mongoose.model('transactions', transactionSchema)