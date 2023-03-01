const adminService = require('../services/adminService');

function AdminController() {

    AdminController.prototype.createAdmin = async function (req, res) {
        const { name, email, password } = req.body;

        try {
            const admin = await adminService.createAdmin(name, email, password);
            res.status(200).json(admin);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    AdminController.prototype.loginAdmin = async function (req, res) {
        const { email, password } = req.body;

        try {
            const admin = await adminService.loginAdmin(email, password);
            res.status(200).json(admin);
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    };

    AdminController.prototype.createMerchant = async function (req, res) {
        const { name, email, password } = req.body;

        try {
            const merchant = await adminService.createMerchant(name, email, password);
            res.status(200).json(merchant);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    AdminController.prototype.loginMerchant = async function (req, res) {
        const { email, password } = req.body;

        try {
            const merchant = await adminService.loginMerchant(email, password);

            res.status(200).json(merchant);
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    };

}

module.exports = new AdminController();