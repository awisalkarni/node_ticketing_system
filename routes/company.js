const router = require('express').Router();

let companyController = require('../controllers/companyController');
const jwt = require('../helpers/jwt');

router.route('/', jwt).get(companyController.index);
router.route('/add', jwt).post(companyController.add);
router.route('/:id', jwt).get(companyController.findById);
router.route('/:id', jwt).delete(companyController.deleteById);
router.route('/update/:id', jwt).post(companyController.updateById);

module.exports = router;