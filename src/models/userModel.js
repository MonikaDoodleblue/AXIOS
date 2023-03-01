const { Model } = require('objection');

class user extends Model {
    static get tableName() {
        return 'usertable';
    }
}

module.exports = function (knex) {
    user.knex(knex);
    return user;
};
