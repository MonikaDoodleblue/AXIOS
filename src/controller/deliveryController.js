const deliveryService = require('../service/deliveryService');
const status = require('../validation/status');
const message = require('../validation/message');

function DeliveryController() { }

DeliveryController.prototype.loginDelivery = async function (req, res) {
    const { email, password } = req.body;

    try {
        const delivery = await deliveryService.loginDelivery(email, password);
        return res.json({ status: delivery.status, message: delivery.message, data: delivery.data })
    } catch (error) {
        res.status(status.internalServerError).json({ message: message.internalServerError });
    }
};

module.exports = new DeliveryController();