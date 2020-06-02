const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const deviceSchema = new Schema({
    name: { type: String, required: true },
    comments: { type: String },
    location: { type: Schema.Types.ObjectId, ref: "Location" },
},
    { timestamps: true });

const Device = mongoose.model('Device', deviceSchema);

module.exports = Device;