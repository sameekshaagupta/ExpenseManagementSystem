const express = require('express');
const { addTransaction, getAllTransaction, editTransaction, deleteTransaction } = require('../controllers/transactionController');

//router object
const router = express.Router()

//routers
router.post('/add-transactions', addTransaction);
router.post('/edit-transactions', editTransaction);
router.post('/delete-transactions', deleteTransaction);
router.post('/get-transactions', getAllTransaction)

module.exports = router