const { Model } = require('objection');

class merchant extends Model {
  static get tableName() {
    return 'merchanttable';
  }
}
module.exports = merchant