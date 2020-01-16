const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const routes = require('./routes')
const {PORT} = require('./constants')

mongoose.connect('mongodb+srv://devsearch:devsearch@cluster0-bmyia.mongodb.net/omnistack10?retryWrites=true&w=majority' ,{
    useCreateIndex: true,    
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const app = express()

app.use(cors())


app.use(express.json())

app.use(routes)

app.listen(PORT, ()=> console.log(`Funfando Parceiro, So vai pra http://localhost:${PORT}/`))