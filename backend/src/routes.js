const express = require('express');

const InstituicoesController = require('./controllers/InstituicoesController');
const NecessidadesController = require('./controllers/NecessidadesController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/instituicoes', InstituicoesController.index);
routes.post('/instituicoes', InstituicoesController.create);
routes.delete('/instituicoes/:id', InstituicoesController.delete);
routes.put('/instituicoes/:id', InstituicoesController.put);



routes.get('/profile', ProfileController.index);

routes.get('/necessidades', NecessidadesController.index);
routes.post('/necessidades', NecessidadesController.create);
routes.delete('/necessidades/:id', NecessidadesController.delete);


module.exports = routes;