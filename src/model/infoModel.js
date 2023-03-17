const { Model } = require('objection');

class info extends Model {
  static get tableName() {
    return 'infoTable';
  }
}
module.exports = info