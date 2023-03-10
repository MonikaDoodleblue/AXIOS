const router = require('express').Router();
const adminController = require('../controllers/adminController');
const { authAdmin } = require('../middleware/auth');
const { joiLogin, register } = require('../validate/joivalidation');

router.post('/login', joiLogin, adminController.loginAdmin);

router.post('/register', register, adminController.createAdmin);

router.post('/create', authAdmin, register, adminController.createMerchant);

router.post('/delivery', authAdmin, register, adminController.createDelivery);

module.exports = router;