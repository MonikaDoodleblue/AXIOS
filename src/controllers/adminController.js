const adminService = require('../services/adminService');

function AdminController() { }

AdminController.prototype.createAdmin = async function (req, res) {
    const { name, email, password, role } = req.body;

    try {
        const admin = await adminService.createAdmin(name, email, password, role);
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

AdminController.prototype.loginAdmin = async function (req, res) {
    const { email, password, role } = req.body;

    try {
        const admin = await adminService.loginAdmin(email, password, role);
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

AdminController.prototype.createMerchant = async function (req, res) {
    const { name, email, password, role } = req.body;

    try {
        const merchant = await adminService.createMerchant(name, email, password, role);
        res.status(200).json(merchant);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

AdminController.prototype.createDelivery = async function (req, res) {
    const { name, email, password, role } = req.body;

    try {
        const delivery = await adminService.createDelivery(name, email, password, role);
        res.status(200).json(delivery);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = new AdminController();