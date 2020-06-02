const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const companySchema = new Schema({
    name: { type: String, required: true },
    comments: { type: String },
    location: { type: Schema.Types.ObjectId, ref: "Location" },
},
    { timestamps: true });

const Company = mongoose.model('Company', companySchema);

module.exports = Company;