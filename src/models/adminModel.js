const { Model } = require('objection');

class admin extends Model {
  static get tableName() {
    return 'adminTable';
  }
}

module.exports = admin