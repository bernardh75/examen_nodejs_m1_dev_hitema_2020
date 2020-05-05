const express = require('express');
const PeopleService = require('./people-service');
const peopleService = new PeopleService();
const bodyParser = require('body-parser');
const HttpStatus = require('http-status-codes');
const v1 = express.Router();
const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/v1', v1);

v1.get('/people', async (request, response) => {
    const people = peopleService.getPeople(request.query)
    response.send(people);
});
v1.put('/people/:id', async (request, response) => {
    const id = request.params.id;
    const people = request.body;
    const isTrue = people.name && people.name.length > 0;
    if (!isTrue) return response.sendStatus(HttpStatus.BAD_REQUEST);
    response.sendStatus(peopleService.updatePeople(id, people));
});

module.exports = app;
