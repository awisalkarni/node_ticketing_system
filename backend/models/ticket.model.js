const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ticketSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, default: "open" },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  priority: { type: Schema.Types.ObjectId, ref: "Priority" },
  device: { type: Schema.Types.ObjectId, ref: "Device" },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "TicketComment"
    }
  ]
},
  { timestamps: true }

);

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;