const moment = require('moment-timezone');
const userModel = require('../models/userModel');
const productModel = require('../models/productModel');
const orderModel = require('../models/orderModel');
const { generateCron } = require('../middleware/cron');

function UserService() { }

UserService.prototype.getAllProducts = async function () {
    try {
        const products = await productModel.query();
        return products;
    } catch (error) {
        console.log(error);
        throw new Error('Unable to fetch products');
    }
};

UserService.prototype.createOrder = async function (order) {
    try {
        const product = await productModel.query()
            .select('product_name', 'product_description', 'product_cost', 'product_color', 'product_brand')
            .where('id', order.product_id)
            .first()

        console.log(product)

        if (!product) {
            throw new Error('Invalid product ID');
        }

        const user = await userModel.query()
            .select('id', 'name', 'email', 'address', 'phoneNo')
            .where('id', order.user_id)
            .first()

        if (!user) {
            throw new Error('Invalid user ID');
        }

        let delivery_id;

        const orderCount = await orderModel.query()
            .count('id')
            .first();

        if (orderCount.count === 0) {
            delivery_id = 1;
        } else {
            const lastOrder = await orderModel.query()
                .orderBy('id', 'desc')
                .first();

            if (lastOrder && lastOrder.delivery_id % 2 === 0) {
                delivery_id = 1;
            } else {
                delivery_id = 2;
            }
        }
        const otp = Math.floor(100000 + Math.random() * 900000);

        const userPlacedOrder = await orderModel.query().insert({
            product_id: order.product_id,
            user_id: order.user_id,
            order_date: moment().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss'),
            order_quantity: order.order_quantity,
            order_cost: product.product_cost * order.order_quantity,
            otp: otp,
            delivery_id: delivery_id
        });
        if (userPlacedOrder.id) {
            await generateCron(userPlacedOrder.id, otp);
        }
        else {
            return {
                status: 500,
                message: "Something went wrong pls try again"
            }
        }

        return { userPlacedOrder, product, user };

    } catch (error) {
        throw error;
    }
};

UserService.prototype.createOrder = async function (order, user_id) {
    try {
        if (order.user_id !== user_id) {
            throw new Error('User ID does not match token.');
        }

        const product = await productModel.query()
            .select('product_name', 'product_description', 'product_cost', 'product_color', 'product_brand')
            .where('id', order.product_id)
            .first()

        console.log(product)

        if (!product) {
            throw new Error('Invalid product ID');
        }

        const user = await userModel.query()
            .select('id', 'name', 'email', 'address', 'phoneNo')
            .where('id', order.user_id)
            .first()

        if (!user) {
            throw new Error('Invalid user ID');
        }

        let delivery_id;

        const orderCount = await orderModel.query()
            .count('id')
            .first();

        if (orderCount.count === 0) {
            delivery_id = 1;
        } else {
            const lastOrder = await orderModel.query()
                .orderBy('id', 'desc')
                .first();

            if (lastOrder && lastOrder.delivery_id % 2 === 0) {
                delivery_id = 1;
            } else {
                delivery_id = 2;
            }
        }
        const otp = Math.floor(100000 + Math.random() * 900000);

        const userPlacedOrder = await orderModel.query().insert({
            product_id: order.product_id,
            user_id: order.user_id,
            order_date: moment().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss'),
            order_quantity: order.order_quantity,
            order_cost: product.product_cost * order.order_quantity,
            otp: otp,
            delivery_id: delivery_id
        });
        if (userPlacedOrder.id) {
            await generateCron(userPlacedOrder.id, otp);
        }
        else {
            return {
                status: 500,
                message: "Something went wrong pls try again"
            }
        }

        return { userPlacedOrder, product, user };

    } catch (error) {
        throw error;
    }
};

UserService.prototype.myOrder = async function (id, order_date) {
    try {
        const orders = await orderModel.query()
            .leftJoin('usertable', 'ordertable.user_id', 'usertable.id')
            .leftJoin('producttable', 'ordertable.product_id', 'producttable.id')
            .select(
                'ordertable.id',
                'ordertable.order_date',
                'ordertable.otp',
                'usertable.name',
                'usertable.email',
                'usertable.address',
                'usertable.phoneNo',
                'producttable.product_name',
                'producttable.product_description',
                'producttable.product_cost',
                'producttable.product_color',
                'producttable.product_brand'
            )
            .where((myorders) => {
                if (id) {
                    myorders.where('ordertable.id', id);
                }
                if (order_date) {
                    myorders.where('ordertable.order_date', order_date);
                }
            });
        return orders;

    } catch (error) {
        console.log(error);
        throw new Error('Unable to fetch the orders');
    }
};

UserService.prototype.orderHistory = async function (id) {
    try {
        const history = await orderModel.query()
            .leftJoin('usertable', 'ordertable.user_id', 'usertable.id')
            .leftJoin('producttable', 'ordertable.product_id', 'producttable.id')
            .leftJoin('statustable', 'ordertable.id', 'statustable.order_id')
            .select(
                'ordertable.id',
                'ordertable.order_date',
                'ordertable.otp',
                'usertable.name',
                'usertable.email',
                'usertable.address',
                'usertable.phoneNo',
                'producttable.product_name',
                'producttable.product_description',
                'producttable.product_cost',
                'producttable.product_color',
                'producttable.product_brand',
                'statustable.order_id',
                'statustable.status'
            )
            .where((myorder) => {
                if (id) {
                    myorder.where('ordertable.id', id);
                }
                if (order_date) {
                    myorder.where('ordertable.order_date', order_date);
                }
            })
            .andWhereRaw('mod(statustable.status_id, 4) = 0');
        return history;
    } catch (error) {
        console.log(error);
        throw new Error('Unable to fetch the history');
    }
};

module.exports = new UserService();