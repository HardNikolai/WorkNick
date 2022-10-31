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
        const [textBody, isCheckBody] = [req.body.text.trim(), req.body.isCheck];
        const checkingValues = typeof(isCheckBody) === 'boolean' && textBody.length;

        if (checkingValues) {
            const task = await Task.create({
                text: textBody,
                isCheck: isCheckBody
            });
            res.status(200).send(task);
        } else {
            res.status(400).send({message: 'Некорректный ввод данных'});
        }
    } catch (error) {
        next(error);
        res.status(500).send({message: error.message});
    }
};

module.exports.changeTaskInfo = async (req, res, next) => {
    try {
        const [textBody, isCheckBody, id] = [req.body.text.trim(), req.body.isCheck, req.body._id];
        const checkingValues = typeof(isCheckBody) === 'boolean' && textBody.length;
        
        if (checkingValues) {
            await Task.findByIdAndUpdate(id, {
                text: textBody, 
                isCheck: isCheckBody
            });
            const newTask = await Task.findById(id);
            res.status(200).send(newTask);
        } else {
            res.status(400).send({message: 'Некорректный ввод данных'});
        }
    } catch (error) {
        next(error);
        res.status(400).send({message: error.message});
    }
};

module.exports.deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.body._id);
        await Task.deleteOne({_id: req.body._id});
        res.status(200).send(task);
    } catch (error) {
        next(error);
        res.status(500).send({message: error.message});
    }
};