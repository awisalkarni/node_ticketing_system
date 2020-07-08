const router = require('express').Router();
let priorityController = require('../controllers/priorityController');
const jwt = require('../helpers/jwt');

router.route('/', jwt).get(priorityController.index);
router.route('/add', jwt).post(priorityController.add);
router.route('/:id', jwt).get(priorityController.findById);
router.route('/:id', jwt).delete(priorityController.deleteById);
router.route('/update/:id', jwt).post(priorityController.updateById);

module.exports = router;