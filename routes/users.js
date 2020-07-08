const router = require('express').Router();
const userController = require('../controllers/userController');
const jwt = require('../helpers/jwt');

router.route('/', jwt).get(userController.index);
router.route('/add', jwt).post(userController.add);
router.route('/login').post(userController.login);
router.route('/register').post(userController.register);
router.route('/:id', jwt).get(userController.findById);
router.route('/:id', jwt).delete(userController.deleteById);
router.route('/update/:id', jwt).post(userController.updateById);

module.exports = router;