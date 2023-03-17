const bcrypt = require('bcrypt');
const infoModel = require('../model/infoModel')
const { generateToken } = require('../middleware/auth');
const status = require('../validation/status')
const message = require('../validation/message')

function DeliveryService() { }

DeliveryService.prototype.loginDelivery = async function (email, password) {
    try {
        const delivery = await infoModel.query().where({ 'email': email }).first();
        const passwordMatch = await bcrypt.compare(password, delivery.password);

        if (!passwordMatch) {
            throw new Error('Invalid email or password.');
        }

        if (delivery.role !== 'delivery') {

            return {
                status: status.badRequest,
                message: message.unauthorized
            }
        }

        const token = generateToken(delivery);
        return { data: { id: delivery.id, name: delivery.name, email: delivery.email, token } };
    }

    catch (error) {
        console.log(error);
        throw new Error('Unable to login delivery.');
    }
};

module.exports = new DeliveryService();