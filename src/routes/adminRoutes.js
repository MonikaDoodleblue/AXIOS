const router = require('express').Router();
const adminController = require('../controllers/adminController');
//const { auth } = require('../middleware/auth');

router.post('/login', adminController.loginAdmin);

router.post('/register', adminController.createAdmin);

router.post('/merchant/register', adminController.createMerchant);

router.post('/merchant/login', adminController.loginMerchant);

module.exports = router;