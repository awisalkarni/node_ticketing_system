const router = require('express').Router();
let Ticket = require('../models/ticket.model');

router.route('/').get((req, res) => {
    Ticket.find()
        .then(tickets => res.json(tickets))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
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
});

router.route('/:id').get((req, res) => {
    Ticket.findById(req.params.id)
        .then(ticket => res.json(ticket))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Ticket.findByIdAndDelete(req.params.id)
        .then(() => res.json('Ticket deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Ticket.findById(req.params.id)
        .then(ticket => {
            ticket.title = req.body.title;
            ticket.description = req.body.description;
            ticket.user = req.body.description;
            ticket.device = req.body.description;
            ticket.priority = req.body.priority;
            ticket.status = req.body.status;

            ticket.save()
                .then(() => res.json('Ticket updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;