const express = require('express')
const path = require('path')
const {connectDb} = require('./models')

const app = express();
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