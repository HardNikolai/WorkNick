const Task = require('../../db/models/task/index');

module.exports.getAllTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find();
        res.send({data: tasks});
    } catch (error) {
        next(error);
        res.status(500).send({message: error.message});
    }
};

module.exports.createNewTask = async (req, res, next) => {
    try {
        if (typeof(req.body.isCheck) === 'boolean') {
            const task = await Task.create({
                text: req.body.text,
                isCheck: req.body.isCheck
            });
            res.status(200).send(task);
        } else {
            res.status(400).send({message: 'isCheck принимает только bollean значения'});
        }
    } catch (error) {
        next(error);
        res.status(500).send({message: error.message});
    }
};

module.exports.changeTaskInfo = async (req, res, next) => {
    try {
        if (typeof(req.body.isCheck) === 'boolean') {
            const task = await Task.findByIdAndUpdate(req.query._id, {
                text: req.body.text, 
                isCheck: req.body.isCheck
            });
            res.status(200).send(task);
        } else {
            res.status(400).send({message: 'isCheck принимает только bollean значения'});
        }
    } catch (error) {
        next(error);
        res.status(400).send({message: error.message});
    }
};

module.exports.deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.query._id);
        const delete_task = await Task.deleteOne({_id: req.query._id});
        if (delete_task.deletedCount === 1) {
            res.status(200).send(task);
        } else {
            throw new Error;
        }
    } catch (error) {
        next(error);
        res.status(500).send({message: error.message});
    }
};