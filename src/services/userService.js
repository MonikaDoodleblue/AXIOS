const bcrypt = require('bcrypt');
const userModel = require('../models/userModel')(require('../config/db'));
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

}

module.exports = new AdminService();