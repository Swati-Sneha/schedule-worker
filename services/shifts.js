const mongodb = require('../utils/mongodb');
const errors = require('../utils/errors');
const timeService = require('../utils/timeService');

const collection = 'schedule';

async function scheduleShift(workerSsn, timestamp, shift){

    let isScheduled = await mongodb.findOne(collection, {date: timestamp, workers: {$in: [workerSsn]}});

    if(isScheduled && isScheduled.shift){
        throw errors.scheduledException
    }
    else{
        await mongodb.update(collection, {date: timestamp, shift: shift}, {$push: {workers: workerSsn}}, {upsert: true});
        console.log(`${workerSsn} is booked for the date ${timestamp}, shift ${shift}`);
        return{}
    }
}


async function deleteSchedule(workerSsn, timestamp){

    let isScheduled = await mongodb.findOne(collection, {date: timestamp, workers: {$in: [workerSsn]}});

    if(isScheduled && isScheduled.shift){
        await mongodb.update(collection,{date: timestamp, shift: isScheduled.shift}, {$pull: {workers: workerSsn}})
        return {}
    }
    else{
        throw errors.emptyScheduleException
    }
}


async function deleteFutureSchedules(workerSsn, startTime){
    await mongodb.updateMany(collection, {date: {$gte: startTime}}, {$pull: {workers: workerSsn}});
}


async function getAllSchedule(startDate, endDate){

    let schedules = await mongodb.findAll(collection, {date: {$gte: startDate, $lte: endDate}}, {_id:0});

    let scheduleArray = [];

    if(Array.isArray(schedules) && schedules.length>0){
        schedules.forEach(schedule=>{
            scheduleArray.push({
                date: timeService.getDateFromTimestamp(schedule.date),
                shift: schedule.shift,
                workers: schedule.workers
            })
        })
    }   

    return scheduleArray
}


async function getWorkersSchedule(workerSsn, startDate, endDate){

    let schedules = await mongodb.findAll(collection, {date: {$gte: startDate, $lte: endDate}, workers: {$in: [workerSsn]}});

    let scheduleArray = [];

    if(Array.isArray(schedules) && schedules.length>0){
        schedules.forEach(schedule=>{
            scheduleArray.push({
                date: timeService.getDateFromTimestamp(schedule.date),
                shift: schedule.shift
            })
        })
    }  

    return scheduleArray
}


module.exports = {
    scheduleShift,
    deleteSchedule,
    deleteFutureSchedules,
    getAllSchedule,
    getWorkersSchedule
}