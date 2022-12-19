const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskScheme = new Schema({
    text: String,
    isCheck: Boolean,
    date: String,
    dateTime: String
});

module.exports = Task = mongoose.model('tasks', taskScheme);