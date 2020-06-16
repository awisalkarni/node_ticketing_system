const router = require('express').Router();
let Zone = require('../models/zone.model');

router.route('/').get((req, res) => {
    Zone.find().populate('company')
        .then(zones => res.json(zones))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const company = req.body.company;


    const newZone = new Zone({
        name,
        company,
    });

    newZone.save()
        .then(() => res.json('Zone added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Zone.findById(req.params.id)
        .then(Zone => res.json(Zone))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Zone.findByIdAndDelete(req.params.id)
        .then(() => res.json('Zone deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Zone.findById(req.params.id)
        .then(zone => {
            zone.name = req.body.name;
            zone.company = req.body.company;

            zone.save()
                .then(() => res.json('Zone updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router; 