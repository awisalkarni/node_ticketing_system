const router = require('express').Router();
const zoneController = require('../controllers/zoneController');

router.route('/').get(zoneController.index);
router.route('/add').post(zoneController.add);
router.route('/:id').get(zoneController.findById);
router.route('/:id').delete(zoneController.deleteByid);
router.route('/update/:id').post(zoneController.updateById);

module.exports = router; 