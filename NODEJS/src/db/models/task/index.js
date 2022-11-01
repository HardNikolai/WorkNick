const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskScheme = new Schema({
    place: String,
    cost: Number,
    date: Date,
  });

module.exports = Task = mongoose.model('tasks', taskScheme);