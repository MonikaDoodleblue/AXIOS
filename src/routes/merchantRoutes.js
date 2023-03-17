const router = require('express').Router();
const merchantController = require('../controllers/merchantController');

router.post('/upload', merchantController.uploadProduct);

router.post('/create', merchantController.createProduct);

router.get('/all', merchantController.getAllProducts);

router.get('/ids', merchantController.getProduct);

router.put('/change/:id', merchantController.updateProduct);

router.delete('/clear/:id', merchantController.deleteProduct);

module.exports = router;
