const { Model } = require('objection');
class user extends Model {
    static get tableName() {
        return 'usertable';
    }
}
module.exports = user