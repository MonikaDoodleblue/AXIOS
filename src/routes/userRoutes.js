const router = require('express').Router();
const userController = require('../controllers/userController');

router.get('/all', userController.getAllProducts);

router.post('/order', userController.createOrder);

router.get('/myorder', userController.myOrder);

router.get('/history/:id', userController.orderHistory);

module.exports = router;