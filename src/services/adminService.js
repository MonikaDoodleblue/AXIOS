const bcrypt = require('bcrypt');
const adminModel = require('../models/adminModel')(require('../config/db'));
const merchantModel = require('../models/merchantModel')(require('../config/db'));
const joiSchema = require('../validate/joivalidation');
//const { generateToken } = require('../middleware/auth');

function AdminService() {

    AdminService.prototype.createAdmin = async function (name, email, password) {
        const { error } = joiSchema.validate({ name, email, password });

        if (error) {
            throw new Error(error.details[0].message);
        }

        try {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const admin = await adminModel.query().insert({ name, email, password: hashedPassword });

            return admin;
        } catch (error) {
            console.log(error);
            throw new Error('Unable to create admin.');
        }
    };

    AdminService.prototype.loginAdmin = async function (email, password) {
        try {
            const admin = await adminModel.query().where('email', email).first();

            if (!admin) {
                throw new Error('Invalid email or password.');
            }

            const passwordMatch = await bcrypt.compare(password, admin.password);

            if (!passwordMatch) {
                throw new Error('Invalid email or password.');
            }

            // const token = generateToken(admin);
            // return { id: admin.id, name: admin.name, email: admin.email, token };

        } catch (error) {
            console.log(error);
            throw new Error('Unable to login admin.');
        }
    };

    AdminService.prototype.createMerchant = async function (name, email, password) {
        const { error } = joiSchema.validate({ name, email, password });

        if (error) {
            throw new Error(error.details[0].message);
        }

        try {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const merchant = await merchantModel.query().insert({ name, email, password: hashedPassword });

            return merchant;
        } catch (error) {
            console.log(error);
            throw new Error('Unable to create merchant.');
        }
    };

    AdminService.prototype.loginMerchant = async function (email, password) {
        try {
            const merchant = await merchantModel.query().where('email', email).first();

            if (!merchant) {
                throw new Error('Invalid email or password.');
            }

            const passwordMatch = await bcrypt.compare(password, merchant.password);

            if (!passwordMatch) {
                throw new Error('Invalid email or password.');
            }

            return { id: merchant.id, name: merchant.name, email: merchant.email };
        } catch (error) {
            console.log(error);
            throw new Error('Unable to login merchant.');
        }
    };

}

module.exports = new AdminService();