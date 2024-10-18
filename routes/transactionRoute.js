const express = require('express');
const { addTransaction, getAllTransaction } = require('../controllers/transactionController');

//router object
const router = express.Router()

//routers
router.post('/add-transaction', addTransaction);

router.get('/get-transaction', getAllTransaction)

module.exports = router