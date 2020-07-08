let Location = require('../models/location.model');

exports.index = (req, res) => {
    Location.find().populate('zone')
    .then(locations => res.json(locations))
    .catch(err => res.status(400).json('Error: ' + err));
}

exports.add = (req, res) => {
    const name = req.body.name;
    const zone = req.body.zone;
    const newLocation = new Location({
        name,
        zone,
    });

    newLocation.save()
        .then(() => res.json('Location added!'))
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.findById = (req, res) => {
    Location.findById(req.params.id)
        .then(location => res.json(location))
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.deleteById = (req, res) => {
    Location.findByIdAndDelete(req.params.id)
        .then(() => res.json('Location deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.updateById = (req, res) => {
    Location.findById(req.params.id)
        .then(location => {
            location.name = req.body.name;
            location.zone = req.body.zone;

            location.save()
                .then(() => res.json('Location updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
};