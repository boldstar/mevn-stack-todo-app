const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    todo: {
        type: String,
        unique: false,
    },
    complete: {
        type: Boolean,
        unique: false
    }
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo