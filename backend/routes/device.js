const router = require('express').Router();
let Device = require('../models/device.model');

router.route('/').get((req, res) => {
    Device.find()
        .then(priorities => res.json(priorities))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const color = req.body.color;


    const newDevice = new Device({
        name,
        color
    });

    newDevice.save()
        .then(() => res.json('Device added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Device.findById(req.params.id)
        .then(Device => res.json(Device))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Device.findByIdAndDelete(req.params.id)
        .then(() => res.json('Device deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Device.findById(req.params.id)
        .then(Device => {
            Device.name = req.body.name;
            Device.color = req.body.color;

            Device.save()
                .then(() => res.json('Device updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router; 