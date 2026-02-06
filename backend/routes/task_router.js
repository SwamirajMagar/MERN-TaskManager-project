const { createTask, getAllTasks, updateTaskByID, DeleteTaskByID } = require('../controllers/taskcontroller');

const express = require('express');
const router = express.Router();


//to get all tasks
router.get('/all',getAllTasks)

//to create task
router.post('/add', createTask)

//to update task
router.put('/edit/:id',updateTaskByID)

//to delete task
router.delete('/delete/:id',DeleteTaskByID)

module.exports = router;
