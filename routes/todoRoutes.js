const express = require('express');
const todoController = require('../controllers/todoController');
// we call the the protector from middleware to protect the routes
const { protect } = require('../controllers/authMiddleware');

const router = express.Router();
router.use(protect);

router.route('/')
.get(todoController.getAllTodos) //fitch all todos
.post(todoController.createTodo); //create a new todo

router.route('/:id')
.patch(todoController.updateTodo) //update a todo
.delete(todoController.deleteTodo); //delete a todo

//btw this is a free server and i made a tunnel from my labtop so the only way to see the website i have to open the labtob and server if u want to inform me other than that u can check the physical code on github.

router.route('/:id/complete')
    .patch(todoController.markCompleted); //mark a todo as completed
module.exports = router;
