const router = require('express').Router();
let ticketController = require('../controllers/ticketController');
const jwt = require('../helpers/jwt');

router.route('/', jwt).get(ticketController.index);
router.route('/filter', jwt).get(ticketController.filter);
router.route('/add/prepare', jwt).get(ticketController.prepare);
router.route('/add', jwt).post(ticketController.add);
router.route('/:id', jwt).get(ticketController.findById);
router.route('/:id', jwt).delete(ticketController.deleteById);
router.route('/update/:id', jwt).post(ticketController.updateById);
router.route('/:id/comment', jwt).post(ticketController.addComment);

module.exports = router;