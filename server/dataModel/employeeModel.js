var mongoose = require('mongoose');

var mongooseUtils = require('./mongoose.utils');

var Schema = mongoose.Schema;

var companySchema = {
    type: Schema.Types.ObjectId,
    ref: 'company'
};

var employeeSchema = new Schema({

    _id: {
        type: Schema.Types.ObjectId,
        required: true
    },

    password: {
        type: String
    },

    name: {
        type: String
    },

    is_active: {
        type: Boolean,
        default: false
    },

    image: {
        type: String
    },

    job_role: {
        type: String
    },

    viewers: [
        {
            type: Schema.Types.ObjectId
        }
    ],

    company: companySchema,

    total_views: {
        type: Number,
        default: 0
    }

}, { usePushEach: true }, mongooseUtils.defaultSchemaOption);

module.exports = mongoose.model('employee', employeeSchema);