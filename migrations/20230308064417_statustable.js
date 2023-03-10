exports.up = function (knex) {
    return knex.schema.createTable('statustable', function (table) {
        table.increments('status_id').primary();
        table.integer('order_id').unsigned().references('id').inTable('ordertable');
        table.enu('status', ['orderPlaced', 'orderShipped', 'reachedLocalHub', 'orderDispatched']);
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('statustable');
};
