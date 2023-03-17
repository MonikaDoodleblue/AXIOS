const deliveryModel = require('../models/deliveryModel')
const orderModel = require('../models/orderModel')
const statusModel = require('../models/statusModel')

function DeliveryService() { }

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