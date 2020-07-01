const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const jobSchema = new Schema({
    username: { type: String, required: true },
    ticket: { type: Schema.Types.ObjectId, ref: "Ticket" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
},
    { timestamps: true }
);

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;