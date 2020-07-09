var async = require("async");

let Ticket = require('../models/ticket.model');
let User = require('../models/user.model');
let Device = require('../models/device.model');

exports.index = (req, res) => {
    async.parallel({
        ticket_count: function(callback) {
            Ticket.countDocuments({}, callback);
        },
        device_count: function(callback) {
            Device.countDocuments({}, callback);
        },
        user_count: function(callback) {
            User.countDocuments({}, callback);
        },
  
  
    }, function(err, results) {

        if (err) {
            res.status(400).json('Error: ' + err);
            return;
        }

        res.json(results);
    });
}