const express = require('express');
const router = express.Router();
const Task = require('../models/taskModel');

// API route for Create method CRUD Operation
router.post("/add", async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json(task);
        console.log(task);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Could not add the task'});
    }
});

// API route for Read method CRUD Operation
router.get("/tasks", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Could not retrieve tasks'});
    }
});

// API route for Update method CRUD Operation
router.delete("/delete/:id", async (req, res) => {
    try {
        const deleteTask = await Task.findByIdAndDelete(req.params.id);
        if (!deleteTask) {
            return res.status(404).json({ error: 'Task not found'});
        }
        res.json(deleteTask);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Could not delete the task'});
    }
});

// API route for Delete method CRUD Operation
router.put("/update/:id", async (req, res) => {
    try {
     const updateTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true});
     if (!updateTask) {
         return res.status(404).json({ error: 'Task not found'});
     }
     res.json(updateTask);
    } catch (err) {
         console.error(err);
         res.status(500).json({ error: 'Could not update the task'});
    }     
 });

 module.exports = router;