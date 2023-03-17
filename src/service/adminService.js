const bcrypt = require('bcrypt');
const infoModel = require('../model/infoModel')
const { generateToken } = require('../middleware/auth');
const status = require('../validation/status')
const message = require('../validation/message')

function AdminService() { }

AdminService.prototype.createAdmin = async function (name, email, password, role) {
    try {
        if (role == 'admin') {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const admin = await infoModel.query().insert({ name, email, password: hashedPassword, role });
            return admin;
        }
        else if (role !== 'admin') {
            return 'Role must be admin.';
        }

    } catch (error) {
        throw new Error('Unable to create admin.');
    }
};

AdminService.prototype.loginAdmin = async function (email, password) {
    try {
        const admin = await infoModel.query().where({ 'email': email }).first();
        const passwordMatch = await bcrypt.compare(password, admin.password);

        if (!passwordMatch) {
            throw new Error('Invalid email or password.');
        }

        if (admin.role !== 'admin') {

            return {
                status: status.badRequest,
                message: message.unauthorized
            }
        }

        const token = generateToken(admin);
        return { data: { id: admin.id, name: admin.name, email: admin.email, token } };
    }

    catch (error) {
        console.log(error);
        throw new Error('Unable to login admin.');
    }
};

AdminService.prototype.createMerchant = async function (name, email, password, role) {
    try {
        if (role == 'merchant') {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const merchant = await infoModel.query().insert({ name, email, password: hashedPassword, role });

            return merchant;
        }
        else if (role !== 'merchant') {
            return 'Role must be merchant'
        }
    } catch (error) {
        console.log(error);
        throw new Error('Unable to create merchant.');
    }
};

AdminService.prototype.createDelivery = async function (name, email, password, role) {
    try {
        if (role == 'delivery') {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const delivery = await infoModel.query().insert({ name, email, password: hashedPassword, role });

            return delivery;
        }
        else if (role !== 'delivery') {
            return 'Role must be delivery'
        }
    } catch (error) {
        console.log(error);
        throw new Error('Unable to create merchant.');
    }
};

module.exports = new AdminService();