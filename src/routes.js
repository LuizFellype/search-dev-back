const { Router } = require('express')
const DevController = require('./controllers/Dev')

const routes = new Router()

routes.get('/', (req, res) => res.json({ funfando: true }))

routes.get('/devs', DevController.getAllDevs)
routes.get('/search', DevController.searchByLocation)

routes.post('/devs', DevController.registerDev)

module.exports = routes