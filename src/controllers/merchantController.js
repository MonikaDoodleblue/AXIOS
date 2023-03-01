const merchantService = require('../services/merchantService');

function MerchantController() { }

MerchantController.prototype.uploadProduct = async function (req, res) {
    try {
        const result = await merchantService.uploadProduct(req.files.file);
        res.status(200).json({ result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while creating the product.' });
    }
};

MerchantController.prototype.getAllProducts = async function (req, res) {
    try {
        const products = await merchantService.getAllProducts();
        res.status(200).json({ products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching products.' });
    }
};

MerchantController.prototype.getProduct = async function (req, res) {
    try {
        const { id, date, product_name } = req.query;
        const product = await merchantService.getProduct(id, date, product_name);
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
        } else {
            res.status(200).json({ product });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching the product.' });
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

MerchantController.prototype.updateProduct = async function (req, res) {
    const { id } = req.params;
    const { product_name, product_description, product_cost, product_color, product_brand } = req.body;

    try {
        const product = await merchantService.updateProduct(id, {
            product_name,
            product_description,
            product_cost,
            product_color,
            product_brand
        });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        return res.status(200).json({ product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Unable to update product' });
    }
};

MerchantController.prototype.deleteProduct = async function (req, res) {
    const { id } = req.params;

    try {
        const isDeleted = await merchantService.deleteProduct(id);

        if (!isDeleted) {
            return res.status(404).json({ message: 'Product not found' });
        }

        return res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Unable to delete product' });
    }
};

module.exports = new MerchantController();