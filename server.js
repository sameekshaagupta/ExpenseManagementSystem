const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')
const colors = require('colors')

//rest object
const app = express();

//middleware
app.use(morgan('dev'))
app.use(cors())