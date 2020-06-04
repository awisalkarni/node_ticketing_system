const router = require('express').Router();
let Location = require('../models/location.model');

router.route('/').get((req, res) => {
    Location.find()
        .then(locations => res.json(locations))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const zone = req.body.zone;


    const newLocation = new Location({
        name,
        zone,
    });

    newLocation.save()
        .then(() => res.json('Location added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Location.findById(req.params.id)
        .then(Location => res.json(Location))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Location.findByIdAndDelete(req.params.id)
        .then(() => res.json('Location deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Location.findById(req.params.id)
        .then(location => {
            location.name = req.body.name;
            location.zone = req.body.zone;

            location.save()
                .then(() => res.json('Location updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router; 