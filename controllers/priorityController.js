let Priority = require('../models/priority.model');

exports.index = (req, res) => {
    Priority.find()
        .then(priorities => res.json(priorities))
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.add = (req, res) => {
    const name = req.body.name;
    const color = req.body.color;
    const newPriority = new Priority({
        name: name,
        color: color
    });

    newPriority.save()
        .then(() => res.json('Priority added!'))
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.findById = (req, res) => {
    Priority.findById(req.params.id)
        .then(priority => res.json(priority))
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.deleteById = (req, res) => {
    Priority.findByIdAndDelete(req.params.id)
        .then(() => res.json('Priority deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.updateById = (req, res) => {
    Priority.findById(req.params.id)
        .then(priority => {
            priority.name = req.body.name;
            priority.color = req.body.color;

            Priority.save()
                .then(() => res.json('Priority updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
}