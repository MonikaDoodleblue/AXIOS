const deliveryService = require('../services/deliveryService');

function DeliveryController() { }

DeliveryController.prototype.loginDelivery = async function (req, res) {
    const { email, password, role } = req.body;

    try {
        const delivery = await deliveryService.loginDelivery(email, password, role);
        res.status(200).json(delivery);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

DeliveryController.prototype.checkDelivery = async function (req, res) {
    const delivery_id = req.query.delivery_id;
    const otp = req.query.otp;
    const id = req.query.id;

    try {
        const result = await deliveryService.checkDelivery(delivery_id, otp, id);
        res.json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

module.exports = new DeliveryController();