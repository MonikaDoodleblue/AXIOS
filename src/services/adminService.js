const bcrypt = require('bcrypt');
const adminModel = require('../models/adminModel')
const merchantModel = require('../models/merchantModel')
const deliveryModel = require('../models/deliveryModel')
const { generateTokenAdmin } = require('../middleware/auth');

function AdminService() { }

AdminService.prototype.createAdmin = async function (name, email, password, role, next) {
    try {
        if (role == 'admin') {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const admin = await adminModel.query().insert({ name, email, password: hashedPassword, role });
            return admin;
        }
        else if (role !== 'admin') {
            return 'Role must be admin.';
        }

    } catch (error) {
        throw new Error('Unable to create admin.');
    }
};

AdminService.prototype.loginAdmin = async function (email, password, role) {
    try {
        if (role == 'admin') {
            const admin = await adminModel.query().where({ 'email': email, 'role': role }).first();
            const passwordMatch = await bcrypt.compare(password, admin.password);

            if (!passwordMatch) {
                throw new Error('Invalid email or password.');
            }

            const token = generateTokenAdmin(admin);
            return { id: admin.id, name: admin.name, email: admin.email, token };
        }
        else {
            return 'role must be admin';
        }
    } catch (error) {
        console.log(error);
        throw new Error('Unable to login admin.');
    }
};

AdminService.prototype.createMerchant = async function (name, email, password, role) {
    try {
        if (role == 'merchant') {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const merchant = await merchantModel.query().insert({ name, email, password: hashedPassword, role });

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

            const delivery = await deliveryModel.query().insert({ name, email, password: hashedPassword, role });

            return delivery;
        }
        else if (role !== 'delivery') {
            return 'Role must be delivery'
        }
    } catch (error) {
        console.log(error);
        throw new Error('Unable to create delivery.');
    }
};

module.exports = new AdminService();