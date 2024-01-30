const express = require('express');
const routes = express.Router();

const AnnotationController = require('./controllers/AnnotationController');
const UsersController = require('./controllers/UserController');
const CountUsers = require('./controllers/CountUsers');

// rota annotations
routes.post('/usuarios',AnnotationController.create);
routes.get('/usuarios',AnnotationController.read);
routes.delete('/usuarios/:id',AnnotationController.delete);

// rota User
routes.post('/user/:id', UsersController.update);

// rota count
routes.get('/userCount',CountUsers.read);

module.exports = routes;