const bcrypt = require('bcrypt');
const deliveryModel = require('../models/deliveryModel')
const orderModel = require('../models/orderModel')
const statusModel = require('../models/statusModel')
const { generateTokenDelivery } = require('../middleware/auth');

function DeliveryService() { }

DeliveryService.prototype.loginDelivery = async function (email, password, role) {
    try {
        if (role == 'delivery') {
            const delivery = await deliveryModel.query().where({ 'email': email, 'role': role }).first();
            const passwordMatch = await bcrypt.compare(password, delivery.password);

            if (!passwordMatch) {
                throw new Error('Invalid email or password.');
            }

            const token = generateTokenDelivery(delivery);
            return { id: delivery.id, name: delivery.name, email: delivery.email, token };
        }
        else {
            return 'role must be delivery';
        }
    } catch (error) {
        console.log(error);
        throw new Error('Unable to login delivery.');
    }
};

DeliveryService.prototype.checkDelivery = async function (delivery_id, otp, id) {
    try {
        console.log("otp-----", otp);
        const order = await orderModel.query().where({ 'id': id, 'delivery_id': delivery_id }).first();
        if (order.otp == otp) {
            await statusModel.query().insert({
                order_id: id,
                status: "orderDispatched"
            });
            return {status: "order Dispatched"}
        }
        else if (order.otp !== otp) {
            throw new Error('Invalid OTP');
        }
    } catch (error) {
        console.log(error);
        throw new Error('Unable to check otp.');

    }
};

module.exports = new DeliveryService();