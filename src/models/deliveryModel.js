const { Model } = require('objection');

class delivery extends Model {
    static get tableName() {
        return 'deliverytable';
    }
}

module.exports = function (knex) {
    delivery.knex(knex);
    return delivery;
};
