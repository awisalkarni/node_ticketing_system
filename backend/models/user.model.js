const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true, trim: true, minlength: 3 },
  email: { type: String, required: true, trim: true, },
  email_verified_at: { type: Date, trim: true },
  password: { type: String, required: true },
  phone_number: { type: String },
  company: { type: Schema.Types.ObjectId, ref: "Company" },
},
  { timestamps: true }

);

const User = mongoose.model('User', userSchema);

module.exports = User;