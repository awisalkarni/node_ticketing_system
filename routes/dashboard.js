const router = require('express').Router();

let dashboardController = require('../controllers/dashboardController');
const jwt = require('../helpers/jwt');

router.route('/', jwt).get(dashboardController.index);

module.exports = router;