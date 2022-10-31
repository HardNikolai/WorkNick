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
        const dayReq = new Date(req.body.date);
        const checkTypePrice = typeof(req.body.text_expenses) === 'number' && req.body.text_expenses >= 0;

        if (checkTypePrice) {
            if (dayReq == 'Invalid Date') {
                res.status(400).send({message: 'Ошибка ввода формата даты. Формат ввода: "2022-12-31'});
            }
            const task = await Task.create({
                text_place: req.body.text_place,
                text_expenses: req.body.text_expenses,
                date: dayReq
                });
        res.status(200).send(task);
        } else {
            res.status(400).send({message: 'Ошибка ввода данных "text_expenses", только числовой формат и больше нуля'});
        }
    } catch (error) {
        next(error);
        res.status(500).send({message: error.message});
    }
};

module.exports.changeTaskInfo = async (req, res, next) => {
    try {
        const dayReq = new Date(req.body.date);
        const num = Number(req.body.text_expenses);
        const checkTypePrice = num > 0;

        if (checkTypePrice) {
            if (dayReq == 'Invalid Date') {
                res.status(400).send({message: 'Ошибка ввода формата даты. Формат ввода: "2022-12-31'});
            }
            await Task.findByIdAndUpdate(req.query._id, {text_place: req.body.text_place, text_expenses: num, date: dayReq});
            const newTask = await Task.findById(req.query._id);
            res.status(200).send(newTask);
        } else {
            res.status(400).send({message: 'Ошибка ввода данных "text_expenses", только числовой формат и больше нуля'})
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