const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const deviceSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
}, 
{
  timestamps: true,
});

const Job = mongoose.model('Job', deviceSchema);

module.exports = Job;