const Worker = require('./worker');
const shiftsService = require('./shifts');
const errors = require('../utils/errors');
const timeService = require('../utils/timeService');

async function addWorker(ssn, firstName, lastName){
    if(!ssn){
        throw errors.ssnIsEmpty
    }

    if(!firstName && !lastName){
        throw errors.invalidNameException
    }
    
    let worker = new Worker(ssn, firstName, lastName);

    try{
       let res =  await worker.getDetails();
       return res;
    }
    catch(err){
        return err
    }
}


async function deleteWorker(ssn){
    if(!ssn){
        throw errors.ssnIsEmpty
    }

    let worker = new Worker(ssn);

    try{
       await worker.delete();
       await shiftsService.deleteFutureSchedules(ssn, timeService.getTimeNow());
    }
    catch(err){
        return err
    }
}

async function getWorkerDetails(ssn){
    if(!ssn){
        throw errors.ssnIsEmpty
    }

    let worker = new Worker(ssn);

    try{
       let res =  await worker.getDetails();
       return res;
    }
    catch(err){
        return err
    }

}

async function scheduleWorker(ssn, date, shift){
    if(!ssn){
        throw errors.ssnIsEmpty
    }

    let worker = new Worker(ssn);

    try{
        let isValid =  await worker.isValidSsn();
        
        if(!isValid){
            throw errors.workerNotFoundException;
        }
       
        isValid = timeService.isShiftTimeValid(date, shift);

        let timestamp = timeService.getTimestampFromDate(date);

        if(isValid){
            let res = await shiftsService.scheduleShift(ssn, timestamp, shift);

            return res;
        }
    }
    catch(err){
        return err
    }
}


async function deleteScheduleFromWorker(ssn, date){
    if(!ssn){
        throw errors.ssnIsEmpty
    }

    let worker = new Worker(ssn);

    try{
        let isValid =  await worker.isValidSsn();
        
        if(!isValid){
            throw errors.workerNotFoundException;
        }

        let timestamp = timeService.getTimestampFromDate(date);

        if(isValid){
            let res = await shiftsService.deleteSchedule(ssn, timestamp);

            return res;
        }
    }
    catch(err){
        return err
    }
}


async function getScheduleforTimeRange(startDate, endDate){
    console.log(startDate, endDate)

    if(!startDate || !endDate){
        throw errors.invalidTimeRange
    }

    startDate = timeService.getTimestampFromDate(startDate);
    endDate = timeService.getTimestampFromDate(endDate);

    let res = await shiftsService.getAllSchedule(startDate, endDate);

    return res;
}


async function getScheduleforWorkerInTimeRange(ssn, startDate, endDate){
    if(!ssn){
        throw errors.ssnIsEmpty
    }

    if(!startDate || !endDate){
        throw errors.invalidTimeRange
    }

    let worker = new Worker(ssn);

    try{
        let isValid =  await worker.isValidSsn();
        
        if(!isValid){
            throw errors.workerNotFoundException;
        }

        startDate = timeService.getTimestampFromDate(startDate);
        endDate = timeService.getTimestampFromDate(endDate);

        let res = await shiftsService.getWorkersSchedule(ssn, startDate, endDate);

        if(Array.isArray(res)){
            return{
                shifts: res,
                count: res.length
            }
        }

        return{
            shifts: [],
            count: 0
        }
    }
    catch(err){
        return err
    }
}

// (async function(){
//     try{
//         // let res = await scheduleWorker(116, 'February 22, 2022', 3)
//         let res = await getScheduleforWorkerInTimeRange(116, 'February 22, 2022', 'February 30, 2022')
//         // let res = await deleteWorker(111);
//         console.log(res);
//     }
//     catch(err){
//         console.log(err);
//     }
// })();

module.exports ={
    addWorker,
    getWorkerDetails,
    deleteWorker,
    scheduleWorker,
    deleteScheduleFromWorker,
    getScheduleforTimeRange,
    getScheduleforWorkerInTimeRange
}

