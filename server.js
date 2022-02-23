var {ValidationError} = require('./utils/validate');

var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;
  bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./routes/route'); //importing route
routes(app); //register the route

app.use((error, request, response, next) => {
  if (error instanceof ValidationError) {
      response.status(400).send(error.validationErrors);
      // next();
  }   
  else{
      next();
  }
});

app.listen(port);

console.log('RESTful API server started on: ' + port);

module.exports = app;