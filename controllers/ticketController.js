
let Ticket = require('../models/ticket.model');
let User = require('../models/user.model');
let Priority = require('../models/priority.model');
let Device = require('../models/device.model');
let Comment = require('../models/ticket_comments.model');

exports.index = (req, res) => {
    Ticket.find()
        .populate(['user', 'device', 'comments'])
        .then(tickets => res.json(tickets))
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.prepare = async (req, res) => {

    Promise.all([
        User.find(),
        Priority.find(),
        Device.find()
    ]).then(([users, priorities, devices]) => {
        res.json({
            'users': users,
            'priorities': priorities,
            'devices': devices
        });
    })
        .catch(err => { res.status(400).json('error: ' + err) });

}

exports.add = (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const priority = req.body.priority;
    const status = req.body.status;
    const user = req.body.user;
    const device = req.body.device;


    const newTicket = new Ticket({
        title,
        description,
        priority,
        status,
        user,
        device,
    });

    newTicket.save()
        .then(() => res.json('Ticket added!'))
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.findById = (req, res) => {
    Ticket.findOne({ _id: req.params.id }).populate(['priority', 'user', 'device',
        {
            path: 'comments',
            populate: {
                path: 'user'
            }
        }
    ])
        .then(ticket => res.json(ticket))
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.deleteById = (req, res) => {
    Ticket.findByIdAndDelete(req.params.id).populate(['device', 'priority', 'user'])
        .then(() => res.json('Ticket deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.updateById = (req, res) => {
    Ticket.findById(req.params.id)
        .then(ticket => {
            ticket.title = req.body.title;
            ticket.description = req.body.description;
            ticket.device = req.body.device;
            ticket.priority = req.body.priority;
            ticket.status = req.body.status;

            ticket.save()
                .then(() => res.json('Ticket updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.addComment = (req, res) => {

    const contents = req.body.contents;
    const ticketId = req.params.id;
    const userId = req.body.user;

    const newComment = new Comment({
        contents: contents,
        owner: ticketId,
        user: userId
    });

    const commentId = newComment._id;

    newComment.save()
        .then(() => {
            Ticket.findByIdAndUpdate(
                ticketId,
                { $push: { comments: commentId } },
                { new: true, useFindAndModify: false }, function (err, ticket) {
                    console.log(ticket);
                    res.json('Comment added');
                }
            );

        })
        .catch(err => res.status(400).json('Error: ' + err));
}