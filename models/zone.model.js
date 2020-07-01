const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const zoneSchema = new Schema({
  name: { type: String, required: true, unique: true, trim: true },
  company: { type: Schema.Types.ObjectId, ref: "Company" }
}, 
{ timestamps: true}
);

const Zone = mongoose.model('Zone', zoneSchema);

module.exports = Zone;