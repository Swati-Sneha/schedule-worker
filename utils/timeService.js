const errors = require('./errors');

function getDateFromTimestamp(timestamp){
    let date =  new Date(timestamp*1000);

    return `${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`
}

function getTimestampFromDate(date){
    return Math.floor(new Date(date).getTime()/1000);
}

function getTimeNow(){
    return Math.floor(new Date().getTime()/1000);
}

Date.prototype.addHours= function(h){
    this.setHours(this.getHours()+h);
    return this;
}

function isShiftTimeValid(date, shift){

    let d = new Date(date);
    let day = d.getDay();

    let addHour = 0;

    switch(shift){
        case 1:
            addHour = 8;
            break;

        case 2:
            addHour = 16;
            break;

        case 3:
            addHour = 24;
            break;

        default: 
            throw errors.invalidShift;
    }

    d.addHours(addHour);

    let timestamp = d.getTime()/1000;
    let timeNow = new Date().getTime()/1000;

    if(timeNow>timestamp){
        console.log(timestamp, timeNow)
        throw errors.pastDayException;
    }

    if(day==0 || day ==6){
        throw errors.nonWorkingDayException;
    }

    return true
}

module.exports ={
    getDateFromTimestamp,
    isShiftTimeValid,
    getTimestampFromDate,
    getTimeNow
}