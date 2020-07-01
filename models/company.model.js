const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const companySchema = new Schema({
    name: { type: String, required: true },
    zones: [
        {
            type: Schema.Types.ObjectId,
            ref: "Zone"
        }
    ]
},
    { timestamps: true });

const Company = mongoose.model('Company', companySchema);

module.exports = Company;