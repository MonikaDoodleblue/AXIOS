const dbConfig = require('../config/db');
dbConfig();
module.exports = {
    admin: require('./adminModel'),
    merchant: require('./merchantModel'),
    delivery: require('./deliveryModel'),
    user: require('./userModel')
};