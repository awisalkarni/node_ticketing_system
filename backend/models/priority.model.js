const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const prioritySchema = new Schema({
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

const Priority = mongoose.model('Priority', prioritySchema);

module.exports = Priority;