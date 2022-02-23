class CustomError {

    constructor(errorObj){
        this.message = errorObj.message,
        this.errCode = errorObj.errCode,
        this.status = errorObj.status
    }
    
}

CustomError.prototype = new Error();
CustomError.prototype.name = "CustomErrorType";


module.exports={
    workerNotFoundException: new CustomError({
        message: "Worker Not Found",
        errCode: "WORKER_NOT_FOUND",
        status: 404
    }),

    invalidNameException: new CustomError({ 
        message: "Name is Invalid",
        errCode: "NAME_IS_INVALID",
        status: 422
    }),

    ssnIsEmpty: new CustomError({
        message: "SSN is mandatory parameter for worker",
        errCode: "SSN_EMPTY",
        status: 400
    }),

    nonWorkingDayException: new CustomError({
        message: "Trying to schedule work on a weekend? You must value work life balance :)",
        errCode: "NON_WORKING_DAY",
        status: 422
    }),

    pastDayException: new CustomError({
        message: "You are trying to schedule work in the past! We dont have time machine yet!!",
        errCode: "PAST_DAY_TIME",
        status: 422
    }),

    emptyScheduleException: new CustomError({
        message: "Can't find a schedule for worker on the given date",
        errCode: "SCHEDULE_NOT_FOUND",
        status: 404
    }),

    scheduledException: new CustomError({
        message: "The worker is already scheduled on the date",
        errCode: "SCHEDULED_ON_DATE",
        status: 409
    }),

    invalidShift: new CustomError({
        message: "Invalid Shift. We allow workers to work only in 3 shifts - 1(0-8),2(8-16),3(16-24)",
        errCode: "INVALID_SHIFT",
        status: 400
    }),

    invalidTimeRange: new CustomError({
        message: "Time Range must have startDate and endDate",
        errCode: "INVALID_TIMERANGE",
        status: 400
    }),

    invalidUser: new CustomError({
        message: "Sorry, we dont identify you!",
        errCode: "INVALID_USER",
        status: 401
    }),

    invalidAuth: new CustomError({
        message: "Could not authorize you!",
        errCode: "INVALID_AUTHORIZATION",
        status: 403
    })
}