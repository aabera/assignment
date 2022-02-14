const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');

require('./db/mongoose')
const userRouter = require('./routers/user')
const bookRouter = require('./routers/book')

const app = express()
const port = 3000

app.use(cors());
app.use(express.json())

app.use(userRouter)
app.use(bookRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
