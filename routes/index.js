const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeContoller');

router.get('/', homeController.getIndex);
router.use('/users', require('./user'));
router.use('/orders', require('./order'));
router.use('/subscriptions', require('./subscription'));
router.use('/couriers', require('./courierCompany'));

module.exports = router;
