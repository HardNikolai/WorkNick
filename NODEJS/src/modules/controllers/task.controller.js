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
        const [place, cost, date] = [req.body.place, Number(req.body.cost), new Date(req.body.date)];
        const checkPrice = typeof(req.body.cost) === 'number' && req.body.cost >= 0;
        if (checkPrice) {
            if (date.toString() === 'Invalid Date') {
                res.status(400).send({message: 'Ошибка ввода формата даты. Формат ввода: "2022-12-31'});
            }
            const task = await Task.create({
                place: place,
                cost: cost,
                date: date
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
        const [place, cost, date, id] = [req.body.place, Number(req.body.cost), new Date(req.body.date), req.body._id];
        const checkPrice = Number(req.body.cost) >= 0;
        const checkDateFormat = date.toString() === 'Invalid Date' || date >= new Date() || date <= new Date(1970);

        if (checkPrice) {
            if (checkDateFormat) {
                res.status(400).send({message: 'Ошибка ввода даты. Формат ввода: "2022-12-31'});
            }
            await Task.findByIdAndUpdate(id, {place: place, cost: cost, date: date});
            const newTask = await Task.findById(id);
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
        const id = req.query._id;
        const task = await Task.findById(id);
        await Task.deleteOne({_id: id});
        res.status(200).send(task);
    } catch (error) {
        next(error);
        res.status(500).send({message: error.message});
    }
};