const { Router } = require('express')
const DevController = require('./controllers/Dev')
const TechController = require('./controllers/Tech')

const routes = new Router()

// Dummy Route
routes.get('/', (req, res) => res.json({ funfando: true }))

// DEV
routes.get('/devs', DevController.getAllDevs)
routes.get('/search', DevController.searchByLocation)

routes.post('/devs', DevController.registerDev)

// TECH
routes.get('/techs',  TechController.getAll)

module.exports = routes