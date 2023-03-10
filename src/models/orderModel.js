const { Model } = require('objection');
class order extends Model {
    static get tableName() {
        return 'ordertable';
    }
}
module.exports = order