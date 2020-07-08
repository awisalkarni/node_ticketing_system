let Device = require('../models/device.model');

exports.index = function(req, res) {
    Device.find().populate('location')
        .then(devices => res.json(devices))
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.add = function(req, res) {
    const name = req.body.name;
    const comments = req.body.comments;
    const location = req.body.location;


    const newDevice = new Device({
        name,
        comments,
        location
    });

    newDevice.save()
        .then(() => res.json('Device added!'))
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.findById = function(req, res) {
    Device.findById(req.params.id)
        .then(Device => res.json(Device))
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.deleteById = function(req, res) {
    Device.findByIdAndDelete(req.params.id)
        .then(() => res.json('Device deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.updateById = function(req, res) {
    Device.findById(req.params.id)
        .then(device => {
            device.name = req.body.name;
            device.comments = req.body.comments;
            device.location = req.body.location;

            device.save()
                .then(() => res.json('Device updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
}