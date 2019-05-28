const express = require('express')
const cors = require('cors')
const path = require('path')
const {connectDb} = require('./models')

const app = express();
// Cross origin access headers handler
app.use(cors())
// Body parser for sending data to view
app.use(express.json())
// Handle form submissions
app.use(express.urlencoded({ extended:false }))
// Routes for handling requests
app.use('/api/todos', require('./routes/api/todos'))

const PORT = process.env.PORT || 5000;

// connect db and listen for port to start
connectDb().then(async () => {
    app.listen(PORT, () => console.log(`Server started on ${PORT}`))
})