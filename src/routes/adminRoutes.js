const router = require('express').Router();
const adminController = require('../controller/adminController');
const merchantController = require('../controller/merchantController');
const deliveryController = require('../controller/deliveryController');
const { joiLogin, joiRegister } = require('../validation/joiValidate');
const { authenticate } = require('../middleware/auth');

router.post('/login', joiLogin, adminController.loginAdmin); //admin

router.post('/merchantlog', joiLogin, merchantController.loginMerchant); //merchant

router.post('/deliverylog', joiLogin, deliveryController.loginDelivery); //delivery

router.post('/register', joiRegister, adminController.createAdmin); //admin

router.post('/merchant', authenticate(['admin']), joiRegister, adminController.createMerchant); //merchant

router.post('/delivery', authenticate(['admin']), joiRegister, adminController.createDelivery); //delivery

router.get('/all', authenticate(['admin', 'merchant']), merchantController.getAllProducts);

router.get('/ids', authenticate(['admin', 'merchant']), merchantController.getProduct);

router.post('/create', authenticate(['admin', 'merchant']), merchantController.createProduct);

router.delete('/clear/:id', authenticate(['admin', 'merchant']), merchantController.deleteProduct);

module.exports = router;