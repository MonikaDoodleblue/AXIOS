const userService = require('../services/userService');

function UserController() { }

UserController.prototype.getAllProducts = async function (req, res) {
    try {
        const products = await userService.getAllProducts();
        res.status(200).json({ products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching products.' });
    }
};

UserController.prototype.createOrder = async function (req, res) {
    try {
        const { product_id, order_quantity, user_id } = req.body;
        const userPlacedOrder = await userService.createOrder({
            product_id,
            order_quantity,
            user_id
        });
        res.status(200).json(userPlacedOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

UserController.prototype.myOrder = async function (req, res) {
    try {
        const { id, order_date } = req.query;
        const orders = await userService.myOrder(id, order_date);
        if (orders.length === 0) {
            res.status(404).json({ message: 'Order not found' });
        } else {
            res.status(200).json({ orders });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching the orders', error });
    }
};

UserController.prototype.orderHistory = async function (req, res) {
    try {
        const id = req.params.id;
        const history = await userService.orderHistory(id);
        if (!history) {
            res.status(500).json({ message: 'not found' });
        } else {
            res.status(200).json({ history });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching the orders.' });
    }
};

module.exports = new UserController();