const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')
const colors = require('colors')
const connectDb = require('./config/connectDb')

//config .env
dotenv.config();
//connectdb
connectDb();
//rest object
const app = express();

//middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

//routes
app.get('/', (req,res)=>{
    res.send('<h1>Helloooo</h1>')
})

//creation of port
const PORT = 8080 || process.env.PORT

//listening the server
app.listen(PORT, ()=>{
    console.log(`Server running on Port: ${PORT}`)
})