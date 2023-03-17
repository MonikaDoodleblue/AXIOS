const dbConfig = require('../config/db');
dbConfig();
module.exports = {
    info: require('./infoModel'),
};