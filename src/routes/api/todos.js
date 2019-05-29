const express = require('express')
const Todo = require('../../models/Todo.js')
const uuid = require('uuid')
const router = express.Router()

// @route   GET api/todos
// @desc    Get all todos
// access   Public
router.get('/', (req, res) => {
    Todo.find()
    .then(todos => res.json(todos))
    .catch(err => res.status(400).json({msg: 'Oops no record found'}))
})

// @route   GET api/todos/:id
// @desc    Get todo by id
// @access  Public
router.get('/:id', (req, res) => {
    Todo.findOne({ _id: req.params.id})
    .then(todo => res.json(todo))
    .catch(err => res.status(400).json({msg: 'Oops no record found'}))
})

// @route   POST api/todos
// @desc    Add new todo
// @access  Public
router.post('/', (req, res) => {
    if(!req.body.todo) res.status(422).json({ msg: 'Please provide a todo' })
    else {
        const newTodo = new Todo({
            id: uuid.v4(),
            todo: req.body.todo,
            complete: false
        })

        newTodo.save().then(todo => {
            res.json({ msg: 'Todo added', todo: todo})
        }).catch(err => res.status(400).json({msg: 'Oops no record found'}))
    }

})

// @route   PUT api/todos/:id
// @desc    Update record by id
// @access  Public
router.put('/:id', (req, res) => {
    Todo.findOne({ _id: req.params.id}).then(todo => {
        todo.todo = req.body.todo
        todo.complete = req.body.complete
        todo.save()
        res.json({msg: 'Todo updated', todo})
    }).catch(err => res.status(400).json({msg: 'Oops no record found'}))
})


// @route   PUT api/todos/complete/:id
// @desc    Complete todo by id
// @access  Public
router.put('/complete/:id', (req, res) => {
    Todo.findOne({ _id: req.params.id}).then(todo => {
        todo.complete = !todo.complete
        todo.save()
        res.json({msg: 'Todo updated', todo})
    }).catch(err => res.status(400).json({msg: 'Oops no record found'}))
})

// @route   POST api/todos/complete
// @desc    Complete array of todos by id
// @access  Public
router.post('/complete', (req, res) => {
    Todo.find().then(todos => {
        for(var i = 0; i < todos.length; i++) {
            const todo = todos.filter(todo => todo._id == req.body[i])
            if(todo.length >= 1) {
                todo[0].complete = true
                todo[0].save()
            }
        } res.json({msg: 'Todos completed', todos: todos})
    }).catch(err => res.status(400).json({msg: 'Oops no record found'}))
})

// @route   DELETE api/todos/:id
// @desc    Delete todo by id
// @access  Public
router.delete('/:id', (req, res) => {
    Todo.findOne({ _id: req.params.id}).then(todo => {
        todo.remove()
        .then(() => res.json({msg: 'Todo deleted'}))
        .catch(err => console.log(err))
    }).catch(err => res.status(400).json({msg: 'Oops no record found'}))
})

// @route   DELETE api/todos/delete-batch
// @desc    Delete todos by id
// @access  Public
router.post('/delete-batch', (req, res) => {
    Todo.find().then(todos => {
        for(var i = 0; i < todos.length; i++) {
            const todo = todos.filter(todo => todo._id == req.body[i])
            if(todo.length >= 1) {
                todo[0].remove()
            }
        } Todo.find().then(todos => res.json({ msg: 'Todos deleted', todos: todos}))
    }).catch(err => res.status(400).json({msg: 'Oops no record found'}))
})

module.exports = router