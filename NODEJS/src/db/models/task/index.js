const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskScheme = new Schema({
    sortBy: String,
    sortDir: String,
    searchText: String,
    searchResult: Object
  });

module.exports = searchResults = mongoose.model('tasks', taskScheme);