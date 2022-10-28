const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskScheme = new Schema({
    text_place: String,
    text_expenses: Number,
    date: Date,
  });

module.exports = Task = mongoose.model('tasks', taskScheme);