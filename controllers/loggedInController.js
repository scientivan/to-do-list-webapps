const { toDoModel, completedModel } = require('../models/dbModel')

exports.mainpage = async (req, res) => {
    try {
        const list = await toDoModel.find({ 'user_id': req.session.user_id })
        res.status(200).json({
            message: 'Success',
            list: list
        })
    } catch (err) {
        res.status(500).json({ message: 'Error fetching to-do list', error: err.message })
    }
}

exports.sort = async (req, res) => {
    try {
        let sortCriteria = {};
        if (req.params.sort == "due_date") {
            sortCriteria = { due_date: 1 };
        } else if (req.params.sort == "priority_level") {
            sortCriteria = { priority_level: -1 };
        }

        const list = await toDoModel.find({ 'user_id': req.session.user_id }).sort(sortCriteria)
        res.status(200).json({
            message: 'List sorted successfully',
            list: list
        })
    } catch (err) {
        res.status(500).json({ message: 'Error sorting to-do list', error: err.message })
    }
}

exports.addData = async (req, res) => {
    try {
        let priorityLevel;
        if (req.body.priority === "Low") {
            priorityLevel = 1;
        } else if (req.body.priority === "Mid") {
            priorityLevel = 2;
        } else if (req.body.priority === "High") {
            priorityLevel = 3;
        }

        console.log(req.body)
        const taskData = {
            ...req.body,
            priority_level: priorityLevel,
            user_id: req.session.user_id
        }

        await toDoModel.insertMany(taskData)
        res.status(201).json({ message: 'Task successfully added', task: taskData })
    } catch (err) {
        res.status(500).json({ message: 'Error adding task', error: err.message })
    }
}

exports.editData = async (req, res) => {
    try {
        
        const updatedTask = await toDoModel.updateOne({"user_id" : req.session.user_id, "_id" : req.body.todo_id },{
            $set : {
                title : req.body.title,
                description : req.body.description,
                due_date : req.body.due_date,
                priority : req.body.priority,
            }
        })

        if (updatedTask.modifiedCount > 0) {
            res.status(200).json({ message: 'Task successfully updated' })
        } else {
            res.status(404).json({ message: 'Task not found or no changes made' })
        }
    } catch (err) {
        res.status(500).json({ message: 'Error updating task', error: err.message })
    }
}

exports.deleteData = async (req, res) => {
    try {
        const isTask = await toDoModel.findById(req.body.todo_id)
        if (!isTask) {
            res.status(404).json({ message: 'Task not found' })
        } else {
            await toDoModel.deleteOne({ '_id': req.body.todo_id })
            res.status(200).json({ message: 'Task successfully deleted' })
        }
    } catch (err) {
        res.status(500).json({ message: 'Error deleting task', error: err.message })
    }
}

exports.deleteCompletedData = async (req, res) => {
    try {
        const isTask = await completedModel.findById(req.body.todo_id)
        if (!isTask) {
            res.status(404).json({ message: 'Task not found in completed list' })
        } else {
            await completedModel.deleteOne({ '_id': req.body.todo_id })
            res.status(200).json({ message: 'Completed task successfully deleted' })
        }
    } catch (err) {
        res.status(500).json({ message: 'Error deleting completed task', error: err.message })
    }
}

exports.statusById = async (req, res) => {
    try {
        const task = await toDoModel.findById(req.params.id)
        if (task) {
            await completedModel.insertMany(task)
            await toDoModel.deleteOne({ '_id': req.params.id })
            res.status(200).json({ message: 'Task successfully marked as completed' })
        } else {
            const completedTask = await completedModel.findById(req.params.id)
            if (completedTask) {
                await completedModel.deleteOne({ '_id': req.params.id })
                res.status(200).json({ message: 'Task successfully restored to To-Do' })
            } else {
                res.status(404).json({ message: 'Task not found' })
            }
        }
    } catch (err) {
        res.status(500).json({ message: 'Error updating task status', error: err.message })
    }
}

exports.completed = async (req, res) => {
    try {
        const list = await completedModel.find({ 'user_id': req.session.user_id })
        res.status(200).json({
            message: 'Success',
            list: list
        })
    } catch (err) {
        res.status(500).json({ message: 'Error fetching completed tasks', error: err.message })
    }
}

exports.completedSort = async (req, res) => {
    try {
        let sortCriteria = {};
        if (req.params.sort == "due_date") {
            sortCriteria = { due_date: 1 };
        } else if (req.params.sort == "priority_level") {
            sortCriteria = { priority_level: -1 };
        }

        const list = await completedModel.find({ 'user_id': req.session.user_id }).sort(sortCriteria)
        res.status(200).json({
            message: 'Completed tasks sorted successfully',
            list: list
        })
    } catch (err) {
        res.status(500).json({ message: 'Error sorting completed tasks', error: err.message })
    }
}
