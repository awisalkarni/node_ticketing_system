let Company = require('../models/company.model');

exports.index = function(req, res) {
    Company.find()
        .then(priorities => res.json(priorities))
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.add = function(req, res) {
    const name = req.body.name;
    const comments = req.body.comments;
    const location = req.body.location;


    const newCompany = new Company({
        name: name,
        comments: comments,
        location: location
    });

    newCompany.save()
        .then(() => res.json('Company added!'))
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.findById = function(req, res) {
    Company.findById(req.params.id)
        .then(Company => res.json(Company))
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.deleteById = function(req, res) {
    Company.findByIdAndDelete(req.params.id)
        .then(() => res.json('Company deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.updateById = function(req, res) {
    Company.findById(req.params.id)
        .then(Company => {
            Company.name = req.body.name;
            Company.comments = req.body.comments;
            Company.location = req.body.location;

            Company.save()
                .then(() => res.json('Company updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
}