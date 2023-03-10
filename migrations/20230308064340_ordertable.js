exports.up = function (knex) {
    return knex.schema.createTable('ordertable', function (table) {
        table.increments('id').primary();
        table.integer('product_id').unsigned().references('id').inTable('producttable');
        table.integer('user_id').unsigned().references('id').inTable('usertable');
        table.date('order_date');
        table.integer('order_quantity');
        table.integer('order_cost');
        table.integer('otp');
        table.integer('delivery_id').unsigned().references('id').inTable('deliverytable');
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('ordertable');
};
