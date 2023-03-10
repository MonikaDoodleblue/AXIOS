const { Model } = require('objection');

class admin extends Model {
  static get tableName() {
    return 'admintable';
  }
}
module.exports = admin