var api = require('../api/api-call.js');

module.exports = function (app) {

    app.use('/', api);

};