var Router = require('express').Router();

var Controller = require('../controller/controller');

Router.get('', Controller.loginOneEmployee);

Router.get('/users/:id', Controller.getOneEmployee);

Router.get('/company/:id', Controller.getOneCompany);

Router.post('/users/:id/', Controller.updateEmployee);

Router.post('/company/:id/', Controller.updateCompany);

Router.put('/users/:id/:empId', Controller.removeEmployeeViewer);

Router.put('/company/:id/:empId', Controller.removeCompanyViewer);

// Router.get('/users', getCache);

module.exports = Router;