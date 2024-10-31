const mongoose = require("mongoose");

const transactionSchema  = new mongoose.Schema({
    amount:{
        type:Number,
        required:[true, 'Amount is required'],
    },
    type:{
        type:String,
        require:[true, 'types is required'],
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