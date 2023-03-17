const bcrypt = require('bcrypt');
const infoModel = require('../model/infoModel')
const { generateToken } = require('../middleware/auth');
const status = require('../validation/status')
const message = require('../validation/message')
const axios = require('axios');
require('dotenv').config();

function MerchantService() { }

MerchantService.prototype.loginMerchant = async function (email, password) {
    try {
        const merchant = await infoModel.query().where({ 'email': email }).first();
        const passwordMatch = await bcrypt.compare(password, merchant.password);

        if (!passwordMatch) {
            throw new Error('Invalid email or password.');
        }

        if (merchant.role !== 'merchant') {

            return {
                status: status.badRequest,
                message: message.unauthorized
            }
        }

        const token = generateToken(merchant);
        return { data: { id: merchant.id, name: merchant.name, email: merchant.email, token } };
    }

    catch (error) {
        console.log(error);
        throw new Error('Unable to login merchant.');
    }
};

MerchantService.prototype.getAllProducts = async function () {
    try {
        const response = await axios.get(`${process.env.baseUrl}/merchant/all`)
            .then(response => {
                return response
            })
            .catch(error => {
                console.log(error);
            });

        return response.data.products;

    } catch (error) {
        console.log(error);
        throw new Error('Unable to fetch products');
    }
};

MerchantService.prototype.getProduct = async function (id, date, product_name) {
    try {
        const response = await axios.get(`${process.env.baseUrl}/merchant/ids?id=${id}||date=${date}||product_name=${product_name}`);
        return response.data.product;
    } catch (error) {
        console.error(error);
        throw new Error('Unable to fetch the product');
    }
};

MerchantService.prototype.createProduct = async function () {
    try {
        const response = await axios.post(`${process.env.baseUrl}/merchant/create`);
        return response.data.product;
    } catch (error) {
        console.error(error);
        throw new Error('Unable to create product.');
    }
};

MerchantService.prototype.deleteProduct = async function (id) {
    try {
        const response = await axios.delete(`${process.env.baseUrl}/merchant/clear/${id}`, { params: { id } });
        return response.data.isDeleted;
    } catch (error) {
        console.log(error);
        throw new Error('Unable to delete product');
    }
};

module.exports = new MerchantService();