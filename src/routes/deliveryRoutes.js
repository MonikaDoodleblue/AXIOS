const router = require('express').Router();
const deliveryController = require('../controllers/deliveryController');
const { authDelivery } = require('../middleware/auth');
const { joiLogin } = require('../validate/joivalidation');

router.post('/login', joiLogin, deliveryController.loginDelivery);

router.get('/check', authDelivery, deliveryController.checkDelivery);

module.exports = router;