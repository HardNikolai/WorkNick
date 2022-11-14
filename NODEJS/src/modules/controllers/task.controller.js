const fs = require('fs').promises;
const file = require('../../../array.json');

module.exports.getData = async (req, res) => {
    try {
        res.send(file);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
};