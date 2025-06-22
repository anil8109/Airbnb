require('ts-node/register'); // whenever ts file loaded it tells to first convert to js file on the go then use by sequelize.
const config = require('./db.config')
module.exports = config;