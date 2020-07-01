const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ticketCommentSchema = new Schema({
    contents: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "Ticket" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
},
    { timestamps: true }
);

const TicketComment = mongoose.model('TicketComment', ticketCommentSchema);

module.exports = TicketComment;