module.exports= {
    addWorker:{
        type: 'object',
        properties: {
            ssn: {
                type: 'number',
                minLength: 1
            },
            firstName: {
                type: 'string'
            },
            lastName: {
                type: 'string',
                minLength: 1
            }
        },
        required: ['ssn', 'lastName'],
        additionalProperties: false
    },

    addSchedule: {
        type: 'object',
        properties: {
            ssn: {
                type: 'number',
                minLength: 1
            },
            date: {
                type: 'string'
            },
            shift: {
                type: 'number',
                enum: [1, 2, 3]
            }
        },
        required: ['ssn', 'date', 'shift'],
        additionalProperties: false
    },

    user: {
        type: 'object',
        properties: {
            username: {
                type: 'string',
                minLength: 5
            },
            password: {
                type: 'string',
                minLength: 5
            }
        },
        required: ['username', 'password'],
        additionalProperties: false
    }
}
