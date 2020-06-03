const router = require('express').Router();
let Company = require('../models/company.model');

router.route('/').get((req, res) => {
    Company.find()
        .then(priorities => res.json(priorities))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const color = req.body.color;


    const newCompany = new Company({
        name,
        color
    });

    newCompany.save()
        .then(() => res.json('Company added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Company.findById(req.params.id)
        .then(Company => res.json(Company))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Company.findByIdAndDelete(req.params.id)
        .then(() => res.json('Company deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Company.findById(req.params.id)
        .then(Company => {
            Company.name = req.body.name;
            Company.color = req.body.color;

            Company.save()
                .then(() => res.json('Company updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;