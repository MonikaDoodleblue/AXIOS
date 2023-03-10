const router = require('express').Router();
const userController = require('../controllers/userController');
const { authUser } = require('../middleware/auth');
const { joiLogin, register } = require('../validate/joivalidation');

router.post('/login', joiLogin, userController.loginUser);

router.post('/register', register, userController.createUser);

router.get('/all', authUser, userController.getAllProducts);

router.post('/order', authUser, userController.createOrder);

router.get('/myorder', authUser, userController.myOrder);

router.get('/history/:id', authUser, userController.orderHistory);

module.exports = router;