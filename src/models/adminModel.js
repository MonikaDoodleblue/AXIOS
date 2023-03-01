const { Model } = require('objection');

class admin extends Model {
  static get tableName() {
    return 'admintable';
  }

//   static get idColumn() {
//     return 'id';
//   }
}

module.exports = function(knex) {
  admin.knex(knex);
  return admin;
};
