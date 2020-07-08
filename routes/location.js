const router = require('express').Router();
let locationController = require('../controllers/locationController');
const jwt = require('../helpers/jwt');

router.route('/', jwt).get(locationController.index);
router.route('/add', jwt).post(locationController.add);
router.route('/:id', jwt).get(locationController.findById);
router.route('/:id', jwt).delete(locationController.deleteById);
router.route('/update/:id', jwt).post(locationController.updateById);

module.exports = router; 