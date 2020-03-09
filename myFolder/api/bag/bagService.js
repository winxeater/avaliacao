const Bag = require('./bag');

//Create REST API, adds CRUD to Mongogs schema
Bag.methods(['get', 'post', 'put', 'delete']);

//Return post/put methods updated
Bag.updateOptions({new: true, runValidators: true});

module.exports = Bag
