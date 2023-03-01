const environment = process.env.NODE_ENV;
const knex = require('knex');
const config = require('../../knexfile')[environment];
const db = knex(config);

module.exports = db;