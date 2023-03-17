const merchantService = require('../service/merchantService');
const status = require('../validation/status');
const message = require('../validation/message');


function MerchantController() { }

MerchantController.prototype.loginMerchant = async function (req, res) {
    const { email, password } = req.body;

    try {
        const merchant = await merchantService.loginMerchant(email, password);
        return res.json({ status: merchant.status, message: merchant.message, data: merchant.data })
    } catch (error) {
        res.status(status.internalServerError).json({ message: message.internalServerError });
    }
};

MerchantController.prototype.getAllProducts = async function (req, res) {
    try {

        const products = await merchantService.getAllProducts();
        res.status(status.success).json({ products });
    } catch (error) {
        console.error(error);
        res.status(status.internalServerError).json({ message: 'An error occurred while fetching products.' });
    }
};

MerchantController.prototype.getProduct = async function (req, res) {
    try {
        const { id, date, product_name } = req.query;
        const product = await merchantService.getProduct(id, date, product_name);
        if (!product) {
            res.status(status.internalServerError).json({ message: 'Product not found' });
        } else {
            res.status(status.success).json({ product });
        }
    } catch (error) {
        console.error(error);
        res.status(status.internalServerError).json({ message: 'An error occurred while fetching the product.' });
    }
};

MerchantController.prototype.createProduct = async function (req, res) {
    try {
        const { product_name, product_description, product_cost, product_color, product_brand } = req.body;

        const product = await merchantService.createProduct({
            product_name,
            product_description,
            product_cost,
            product_color,
            product_brand,
        });

        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Unable to create product' });
    }
};

MerchantController.prototype.deleteProduct = async function (req, res) {
    const { id } = req.params;

    try {
        const isDeleted = await merchantService.deleteProduct(id);

        if (!isDeleted === false) {
            return res.status(500).json({ message: 'Product not found' });
        }

        return res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Unable to delete product' });
    }
};

module.exports = new MerchantController();