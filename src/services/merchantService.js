const productModel = require('../models/productModel')(require('../config/db'));
const xlsx = require('xlsx');

function MerchantService() { }

MerchantService.prototype.uploadProduct = async function (file) {
    try {
        if (!file) {
            throw new Error('No file uploaded');
        }
        const workbook = xlsx.read(file.data, { type: 'buffer' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = xlsx.utils.sheet_to_json(sheet);
        for (let i = 0; i < data.length; i++) {
            const row = data[i];
            const product = {
                product_name: row.product_name,
                product_description: row.product_description,
                product_cost: row.product_cost,
                product_color: row.product_color,
                product_brand: row.product_brand
            };
            await productModel.query().insert(product);
        }
    } catch (error) {
        console.log(error);
        throw new Error('Unable to create products');
    }
};

MerchantService.prototype.getAllProducts = async function () {
    try {
        const products = await productModel.query();
        return products;
    } catch (error) {
        console.log(error);
        throw new Error('Unable to fetch products');
    }
};

MerchantService.prototype.getProduct = async function (id, date, product_name) {
    try {
        let query = productModel.query();

        if (id) {
            query = query.where('id', id);
        }

        if (date) {
            query = query.whereRaw('DATE(created_at) = ?', [date]);
        }

        if (product_name) {
            query = query.where('product_name', product_name);
        }

        const products = await query.select();
        return products;
    } catch (error) {
        console.log(error);
        throw new Error('Unable to fetch the product');
    }
};

MerchantService.prototype.createProduct = async function (productData) {
    try {
        const product = await productModel.query().insert(productData);

        return product;
    } catch (error) {
        console.error(error);
        throw new Error('Unable to create product.');
    }
};

MerchantService.prototype.updateProduct = async function (id, productData) {
    try {
        const updatedRows = await productModel.query().where({ id }).update(productData);

        if (updatedRows === 0) {
            return null;
        }

        const updatedProduct = await productModel.query().where({ id }).first();
        return updatedProduct;
    } catch (error) {
        console.error(error);
        throw new Error('Unable to update product');
    }
};

MerchantService.prototype.deleteProduct = async function (id) {
    try {
        const deletedRows = await productModel.query().where({ id }).del();
        if (deletedRows === 0) {
            throw new Error('Product not found');
        }
        return true;
    } catch (error) {
        console.log(error);
        throw new Error('Unable to delete product');
    }
};

module.exports = new MerchantService();