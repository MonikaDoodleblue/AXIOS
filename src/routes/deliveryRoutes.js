const router = require('express').Router();
const deliveryController = require('../controllers/deliveryController');

router.get('/check', deliveryController.checkDelivery);

module.exports = router;