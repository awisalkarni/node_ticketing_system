const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const jobCommentSchema = new Schema({
    contents: { type: String, required: true },
    job: { type: Schema.Types.ObjectId, ref: "Job" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
},
    { timestamps: true }
);

const JobComment = mongoose.model('JobComment', jobCommentSchema);

module.exports = JobComment;