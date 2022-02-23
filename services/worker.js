const mongodb = require('../utils/mongodb')
const errors = require('../utils/errors');

module.exports = class Worker{
    constructor(ssn, firstName, lastName){
        this.firstName = firstName;
        this.lastName = lastName;
        this.ssn = ssn,
        this.collection = 'worker'
    }

    fullName(){
        let fullName = '';
        fullName = (this.firstName)?this.firstName+' ':'';
        fullName +=(this.lastName)?this.lastName:''
        if(fullName && fullName.length>0){
            return fullName.trim();
        }
        else{
            throw errors.invalidNameException;
        }
    }

    async workerExists(){
        if(!this.ssn){
            throw errors.ssnIsEmpty
        }
        let isWorker = await mongodb.findOne(this.collection, {ssn: this.ssn, deleted: {$ne: true}}, {_id:0})
        return isWorker
    }

    async getDetails(){
        try{
            let isWorker = await this.workerExists();

            if(isWorker){
                return {
                    name: isWorker.name,
                    ssn: isWorker.ssn
                }
            }
            
            if(this.firstName || this.lastName){
                
                await mongodb.update(this.collection, {ssn: this.ssn}, {$set: {name: this.fullName()}}, {upsert: true});

                return {
                    name: this.fullName(),
                    ssn: this.ssn
                };
            }
            else{
                throw errors.workerNotFoundException
            }
        }
        catch(err){
            return err
        }
    }

    async isValidSsn(){
        try{
            let isWorker = await this.workerExists();

            if(isWorker) return true;
        
            return false
        }
        catch(err){
            return err
        }   
    }

    async delete(){
        try{
            let isWorker = await this.workerExists();

            if(!isWorker){
                throw errors.workerNotFoundException
            }

            await mongodb.update(this.collection, {ssn: this.ssn}, {$set: {deleted: true}})
        }
        catch(err){
            return err
        }
    }
}

