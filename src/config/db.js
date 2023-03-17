const knex = require('knex')(require('../../knexfile'));

const { Model } = require('objection');

knex
    .raw("select 1+1 as result")
    .then(_ => {
        console.log('Database connected successfully')
    })
    .catch(e => {
        console.log(e)
        process.exit(1)
    })
Model.knex(knex)

module.exports = knex;