const deliveryService = require('../services/deliveryService');

function DeliveryController() { }

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