const userService = require('../services/userService');

function UserController() {

    UserController.prototype.createUser = async function (req, res) {
        const { name, email, password } = req.body;

        try {
            const user = await userService.createUser(name, email, password);
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    UserController.prototype.loginUser = async function (req, res) {
        const { email, password } = req.body;

        try {
            const user = await userService.loginAdmin(email, password);
            res.status(200).json(user);
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    };

}

module.exports = new UserController();