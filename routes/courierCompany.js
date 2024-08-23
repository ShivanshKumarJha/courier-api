const express = require('express');
const router = express.Router();
const courierCompanyController = require('../controllers/courierCompanyController');

router.get('/', courierCompanyController.getCourierCompany);

module.exports = router;
