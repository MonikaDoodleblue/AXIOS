const { Model } = require('objection');

class status extends Model {
  static get tableName() {
    return 'statustable';
  }
}
module.exports = status