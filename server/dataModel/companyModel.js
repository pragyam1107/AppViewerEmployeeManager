var mongoose = require('mongoose');

var mongooseUtils = require('./mongoose.utils');

var Schema = mongoose.Schema;

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
        {
            type: Schema.Types.ObjectId
        }
    ],

    total_views: {
        type: Number,
        default: 0
    }

}, mongooseUtils.defaultSchemaOption);

module.exports = mongoose.model("company", companySchema);