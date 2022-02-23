# Schedule-Worker
### This app schedules a 8 hour shift for worker on weekdays using REST APIs

## Features

- Only authorized person can perform REST API operations
- Allows to get all schedules for a time range
- Allows to get a worker's schedule for a time range
- Allows to create worker, uniquely identified by their Social Sceurity Number (ssn)
- Allows to get details of worker using ssn
- Allows to create schedule for worker. 
- Work can't be scheduled for worker at a past time or on Weekends (Work-Life Balance!!)
- Workers work in only three shifts (0-8, 8-16, 16-24)
- Workers work only one shift in a day.
- Allows to delete a worker. All future schedules of worker is also removed.
- Allows to delete a shift from worker's schedule


## APIs:
- Get Auth Token (Only allows a single user credential)
    ```sh
        URL: /scheduler/user
        METHOD: POST
        Request Body: 
            {username: <username>, 
            password: <password>}
        Response: <token>
    ```
    
- Create a Worker
    ```sh
        URL: /scheduler/worker
        METHOD: POST
        Header: Bearer <token>
        Request Body: 
            {ssn: <unique number>, 
            lastName: <string>,
            firstName: <string> (optional)}
        Response: {
            firstName: <string>,
            lastName: <string>,
            ssn: <number>
        }
    ```
    
- Get Worker Details
    ```sh
        URL: /scheduler/worker?ssn=<number>
        METHOD: GET
        Header: Bearer <token>
        Response: {
            firstName: <string>,
            lastName: <string>,
            ssn: <number>
        }
    ```
    
- Delete a Worker
    ```sh
        URL: /scheduler/worker?ssn=<number>
        METHOD: DELETE
        Header: Bearer <token>
        Response: {}
    ```
    
- Add a Worker's Schedule
    ```sh
        URL: /scheduler/schedule
        METHOD: POST
        Header: Bearer <token>
        Request Body: 
            {ssn: <unique number>, 
            date: <date> (eg: "Feb 25, 2022"),
            shift: <enum [1,2,3]>
            }
        Response: {}
    ```
    
- Get a Worker's Schedule for a time range
    ```sh
        URL: /scheduler/schedule?ssn=<number>&startDate:<date>&endDate:<date>
        METHOD: GET
        Header: Bearer <token>
        Response: {
            "shifts": [
                {
                    "date": <date>,
                    "shift": <enum [1,2,3]>
                },
                {
                    "date": <date>,
                    "shift": <enum [1,2,3]>
                }
                ...
            ],
        "count": <number>
    }
    ```
    
- Delete a Worker's Schedule
    ```sh
        URL: /scheduler/schedule?ssn=<number>&date=<date>
        METHOD: DELETE
        Header: Bearer <token>
        Response: {}
    ```
    
- Delete a Worker's Schedule
    ```sh
        URL: /scheduler/schedule?ssn=<number>&date=<date>
        METHOD: DELETE
        Header: Bearer <token>
        Response: {}
    ```
    
- Get all Worker's Schedule for a time range
    ```sh
        URL: /scheduler/allSchedule?startDate=<date>&endDate=<date>
        METHOD: GET
        Header: Bearer <token>
        Response: [
        {
            "date": <date>
            "shift": 1,
            "workers": [
                <ssn>, <ssn>, ...
            ]
        },
       {
            "date": <date>
            "shift": 2,
            "workers": [
                <ssn>, <ssn>, ...
            ]
        },
       {
            "date": <date>
            "shift": 3,
            "workers": [
                <ssn>, <ssn>, ...
            ]
        }
    ]
    ```

## Tech

Schedule-Worker uses a number of open source projects to work properly:

- [node.js] 
- [Express] 
- [mongodb]
- [Jest] - for unit test cases

## Installation

```sh
npm install
npm start
```

## Run Test Cases

```sh
npm test
```

Schedule-Worker reads following variables from .env files:

```sh
NODE_ENV= dev
MONGO_DB = <mongo-uri>

JWT_SECRET_KEY = <jwt-secret-key>
TOKEN_HEADER_KEY= <token-header-key>

USER_NAME: <username>
USER_PASSWORD: <password>
```

## Future Scopes

- Add more users to access APIs
- Add roles to users for access rights limited to few APIs
- Add Holiday for Users
- Add Calendar for Users for effective scheduling

   [mongodb]: <https://www.mongodb.com/r>
   [node.js]: <http://nodejs.org>
   [Express]: <https://expressjs.com>
   [jest]: <https://jestjs.io/>

