var _ = require('lodash');
var mongoose = require('mongoose');
// const redis = require('redis');
// const client = redis.createClient();

// var redisClient = client(6379, 'localhost');
let ResponseUtils = require('../utils/response.utils');
let Company = require('../dataModel/companyModel');
let Employee = require('../dataModel/employeeModel');

// redisClient.on('error', (err) => {
//     console.log('error: '+err);
// });

function loginOneEmployee(req, res, next) {
    
    let empName = req.query.username;
    let password = req.query.password;
    if (!empName) {

        return res.json(ResponseUtils.responseMessage(false, 'error', null));

    }

    let populateQuery = [
        {
            path: 'company',
            select: 'name _id'
        }
    ];

    Employee.findOne({"name": empName, "password": password}).populate(populateQuery).exec(function (err, emp) {

        if (err) {
            return res.json(ResponseUtils.responseError(err));
        }

        if (!emp) {
            return res.json(ResponseUtils.responseMessage(false, 'failed', null));
        }
        return res.json(ResponseUtils.responseMessage(true, 'success', emp));

    });

}

function getOneEmployee(req, res, next) {

    let employeeId = req.params.id;

    Employee.findById(employeeId).exec(function (err, emp){        
        if (err) {
            return res.json(ResponseUtils.responseError(err));
        }

        if (!emp) {
            return res.json(ResponseUtils.responseMessage(false, 'failed', null));
        }

        return res.json(ResponseUtils.responseMessage(true, 'success', emp));

    });

}

function getOneCompany(req, res, next) {

    let companyId = req.params.id;

    Company.findById(companyId).exec(function (err, comp){        
        if (err) {
            return res.json(ResponseUtils.responseError(err));
        }

        if (!comp) {
            return res.json(ResponseUtils.responseMessage(false, 'failed', null));
        }

        return res.json(ResponseUtils.responseMessage(true, 'success', comp));

    });

}

function updateEmployee(req, res, next) {

    var employeeId = req.params.id;
    let viewer = req.body;
    var employeeViewers = req.params.viewers;

    if (!employeeId) {
        return res.json(ResponseUtils.responseMessage(false, 'failed', null));
    }

    if(_.includes(employeeViewers, viewer) == true) {
        console.log("here")
        return;
    }

    let query = {
        $push: { viewers: viewer },
        $inc: { total_views: 1 }
    };

    Employee.findByIdAndUpdate(employeeId, query).exec(function(err, emp) {
        if (err) {
            return res.json(ResponseUtils.responseError(err));
        }

        return res.json(ResponseUtils.responseMessage(true, 'success', emp));
    });

}

function updateCompany(req, res, next) {

    var compId = req.params.id;
    var companyViewers = req.params.viewer;
    let viewer = req.body;

    if (!compId) {
        return res.json(ResponseUtils.responseMessage(false, 'failed', null));
    }

    if (_.includes(companyViewers, viewer) == true) {
        console.log("here")
        return;
    }

    let query = {
        $push: { viewers: viewer },
        $inc: { total_views: 1 }
    };

    Company.findByIdAndUpdate( compId, query).exec(function(err, comp) {
        if (err) {
            return res.json(ResponseUtils.responseError(err));
        }

        return res.json(ResponseUtils.responseMessage(true, 'success', comp));
    });

}

function removeEmployeeViewer(req, res, next) {

    var employeeId = req.params.id;
    let viewer = req.params.empId;
    let query = { 
        $pull: { viewers: viewer }, 
        $inc: { total_views: -1 }
    };

    Employee.findByIdAndUpdate( employeeId, query).exec(function(err, emp) {
        if (err) {
            return res.json(ResponseUtils.responseError(err));
        }

        if (!emp) {
            return res.json(ResponseUtils.responseMessage(false, 'failed', null));
        }

        return res.json(ResponseUtils.responseMessage(true, 'success', emp));
    });

}

function removeCompanyViewer(req, res, next) {

    var compId = req.params.id;
    let viewer = req.params.empId;
    let query = { 
        $pull: { viewers: viewer }, 
        $inc: { total_views: -1 }
    };

    Company.findByIdAndUpdate( compId, query).exec(function(err, comp) {
        if (err) {
            return res.json(ResponseUtils.responseError(err));
        }

        if (!comp) {
            return res.json(ResponseUtils.responseMessage(false, 'failed', null));
        }

        return res.json(ResponseUtils.responseMessage(true, 'success', comp));
    });

}
module.exports = {
    loginOneEmployee: loginOneEmployee,
    getOneEmployee: getOneEmployee,
    getOneCompany: getOneCompany,
    updateEmployee: updateEmployee,
    updateCompany: updateCompany,
    removeEmployeeViewer: removeEmployeeViewer,
    removeCompanyViewer: removeCompanyViewer
};