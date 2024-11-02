const express = require('express');
const { addTransaction, getAllTransaction, editTransaction } = require('../controllers/transactionController');

//router object
const router = express.Router()

//routers
router.post('/add-transactions', addTransaction);
router.post('/edit-transactions', editTransaction);
router.post('/get-transactions', getAllTransaction)

module.exports = router