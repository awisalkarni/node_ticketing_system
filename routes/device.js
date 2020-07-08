const router = require('express').Router();
let deviceController = require('../controllers/deviceController');
const jwt = require('../helpers/jwt');

router.route('/', jwt).get(deviceController.index);
router.route('/add', jwt).post(deviceController.add);
router.route('/:id', jwt).get(deviceController.findById);
router.route('/:id', jwt).delete(deviceController.deleteById);
router.route('/update/:id', jwt).post(deviceController.updateById);

module.exports = router; 