const express       = require('express')
const mongoose      = require('mongoose')
const morgan        = require('morgan')
const bodyParser    = require('body-parser')
const http          = require('http')

const ImageRoutes = require('./routes/apiRoutes')

//MongoDB connection

mongoose.connect('mongodb://127.0.0.1:27017/testdb', {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection

db.on('error', (err) =>{
    console.log(err)
})

db.once('open', ()=>{
    console.log("\n************Database Connection*****************\n");
    console.log('Connected to DB successfully !!')
})

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

//Defining the ip and port for the application/api to run
const ip = '127.0.0.1' || 'localhost'
const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log("\n************Server Details*****************\n");
    console.log(`Server is listening: http://${ip}:${PORT}`)
})

app.use('/api/image', ImageRoutes)