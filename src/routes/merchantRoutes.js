const router = require('express').Router();
const merchantController = require('../controllers/merchantController');
const { authMerchant } = require('../middleware/auth');
const {joiLogin} =require('../validate/joivalidation');

router.post('/login',joiLogin, merchantController.loginMerchant);

router.post('/upload', authMerchant, merchantController.uploadProduct);

router.post('/create',authMerchant, merchantController.createProduct);

router.get('/all',authMerchant, merchantController.getAllProducts);

router.get('/ids',authMerchant, merchantController.getProduct);

router.put('/change/:id',authMerchant,  merchantController.updateProduct);

router.delete('/clear/:id',authMerchant,  merchantController.deleteProduct);

module.exports = router;