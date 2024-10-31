const transactionModel = require('../models/transactionModel')

const getAllTransaction = async (req, res) => {
    try {
        const transaction = await transactionModel.find({})
        res.status(200).json(transaction)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}
const addTransaction  = async (req, res) =>{
    try {
        const newTransaction = new transactionModel(req.body)
        await newTransaction.save()
        res.status(201).send('Transaction Created')
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
}

module.exports = {getAllTransaction, addTransaction}