const searchResults = require('../../db/models/task/index');

module.exports.saveLastRes = async (req, res) => {
    try {
        const {sortBy, sortDir, searchText, searchResult} = req.body;
        const saveRes = await searchResults.updateOne({sortBy, sortDir, searchText}, {searchResult}, {upsert:true});
        if (saveRes.matchedCount != 1) {
            throw new Error();
        }
        res.send({success: true});
    } catch (error) {
        res.status(500).send({success: false});
    }
};