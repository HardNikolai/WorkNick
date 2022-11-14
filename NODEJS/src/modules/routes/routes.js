const express = require('express');
const router = express.Router();

const {
    getData
} = require('../controllers/task.controller');

const {
    saveLastRes
} = require('../controllers/saveTask');

router.get('/tasks', getData);
router.post('/task', saveLastRes);

module.exports = router;