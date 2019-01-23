var mongoose = require('mongoose');

var mongooseUtils = require('./mongoose.utils');

var Schema = mongoose.Schema;

var employeeSchema = {
    type: Schema.Types.ObjectId,
    ref: 'employee'
};

var companySchema = new Schema({

    _id: {
        type: Schema.Types.ObjectId,
        required: true
    },

    name: {
        type: String
    },

    address: {
        type: String
    },

    viewers: [
        employeeSchema
    ],

    total_views: {
        type: Number,
        default: 0
    }

}, mongooseUtils.defaultSchemaOption);

module.exports = mongoose.model("company", companySchema);