const express = require('express');
const { addTransaction, getAllTransaction } = require('../controllers/transactionController');

//router object
const router = express.Router()

//routers
router.post('/add-transactions', addTransaction);

router.post('/get-transactions', getAllTransaction)

module.exports = router