let Zone = require('../models/zone.model');

exports.index = (req, res) => {
    Zone.find().populate(['company'])
        .then(zones => res.json(zones))
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.add = (req, res) => {
    const name = req.body.name;
    const company = req.body.company;


    const newZone = new Zone({
        name: name,
        company: company,
    });

    newZone.save()
        .then(() => res.json('Zone added!'))
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.findById = (req, res) => {
    Zone.findById(req.params.id)
        .then(Zone => res.json(Zone))
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.deleteByid = (req, res) => {
    Zone.findByIdAndDelete(req.params.id)
        .then(() => res.json('Zone deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.updateById = (req, res) => {
    Zone.findById(req.params.id)
        .then(zone => {
            zone.name = req.body.name;
            zone.company = req.body.company;

            zone.save()
                .then(() => res.json('Zone updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
}