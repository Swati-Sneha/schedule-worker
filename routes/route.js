const workerSchedule = require('../services/workersShifts');
const users = require('../services/authorization');
const reqObjects = require('./reqObjects');
const {validate} = require('../utils/validate');
const {validateToken} = require('../services/authorization');
   
module.exports = function(app){
    app.route('/scheduler/user')
        .post(
            validate({body: reqObjects.user}),
            authorizeUser
        )

    app.route('/scheduler/worker')
        .post(
            validate({body: reqObjects.addWorker}),
            addWorker
        )
        .get(getWorker)
        .delete(deleteWorker)

    app.route('/scheduler/schedule')
        .post(
            validate({body: reqObjects.addSchedule}),
            addSchedule
        )
        .get(getWorkersSchedule)
        .delete(deleteWorkerSchedule)
    
    app.route('/scheduler/allSchedule')
        .get(getAllSchedule)
      
}  



async function authorizeUser(req, res){
    try{
        let resp = await users.auth(req.body.username, req.body.password);
        res.status(200).send(resp)
    }
    catch(err){
        res.status(err.status).send({message: err.message, code: err.errCode})
    }
}

async function addWorker(req, res){
    try{
        validateToken(req.headers);
        let resp = await workerSchedule.addWorker(req.body.ssn, req.body.firstName, req.body.lastName);
        res.status(200).send(resp)
    }
    catch(err){
        res.status(err.status).send({message: err.message, code: err.errCode})
    }   
}

async function getWorker(req, res){
    try{
        console.log(req);
        validateToken(req.headers);
        let resp = await workerSchedule.getWorkerDetails(parseInt(req.query.ssn));
        res.status(200).send(resp)
    }
    catch(err){
        console.log(err)
        res.status(err.status).send({message: err.message, code: err.errCode})
    }   
}

async function deleteWorker(req, res){
    try{
        validateToken(req.headers);
        let resp = await workerSchedule.deleteWorker(parseInt(req.query.ssn));
        res.status(200).send(resp)
    }
    catch(err){
        res.status(err.status).send({message: err.message, code: err.errCode})
    }   
}



async function addSchedule(req, res){
    try{
        validateToken(req.headers);
        if((new Date(req.body.date) !== "Invalid Date") && !isNaN(new Date(req.body.date))){
            let resp = await workerSchedule.scheduleWorker(req.body.ssn, req.body.date, req.body.shift);
            console.log(resp)
            res.status(200).send(resp)
        }
        else{
            res.status(500).send({message: "Date is in Incorrect Format", errCode: "INCORRECT_DATE"});
        }
    }
    catch(err){
        res.status(err.status).send({message: err.message, code: err.errCode})
    }   
}

async function getWorkersSchedule(req, res){
    try{
        validateToken(req.headers);
        if((new Date(req.query.startDate) !== "Invalid Date") && !isNaN(new Date(req.query.startDate)) && 
        (new Date(req.query.endDate) !== "Invalid Date") && !isNaN(new Date(req.query.endDate))){
            let resp = await workerSchedule.getScheduleforWorkerInTimeRange(parseInt(req.query.ssn), req.query.startDate, req.query.endDate);
            res.status(200).send(resp)
        }
        else{
            res.status(500).send({message: "Date is in Incorrect Format", errCode: "INCORRECT_DATE"});
        }
    }
    catch(err){
        res.status(err.status).send({message: err.message, code: err.errCode})
    }   
}

async function deleteWorkerSchedule(req, res){
    try{
        validateToken(req.headers);
        if((new Date(req.query.date) !== "Invalid Date") && !isNaN(new Date(req.query.date))){
            let resp = await workerSchedule.deleteScheduleFromWorker(parseInt(req.query.ssn), req.query.date);
            res.status(200).send(resp)
        }
        else{
            res.status(500).send({message: "Date is in Incorrect Format", errCode: "INCORRECT_DATE"});
        }
    }
    catch(err){
        res.status(err.status).send({message: err.message, code: err.errCode})
    }   
}

async function getAllSchedule(req, res){
    try{
        validateToken(req.headers);
        if((new Date(req.query.startDate) !== "Invalid Date") && !isNaN(new Date(req.query.startDate)) && 
        (new Date(req.query.endDate) !== "Invalid Date") && !isNaN(new Date(req.query.endDate))){
            let resp = await workerSchedule.getScheduleforTimeRange(req.query.startDate, req.query.endDate);
            res.status(200).send(resp)
        }
        else{
            res.status(500).send({message: "Date is in Incorrect Format", errCode: "INCORRECT_DATE"});
        }
    }
    catch(err){
        res.status(err.status).send({message: err.message, code: err.errCode})
    }   
}