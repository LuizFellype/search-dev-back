const axios = require('axios')
const DevModel = require('../models/Dev')
const Tech = require('../models/Tech')

const { githubUsersUri } = require('../constants')

module.exports = {

    getAllDevs: async (req, res) => {
        const devs = await DevModel.find()

        return res.json(devs)
    },

    searchByLocation: async (req, res) => {
        const { long, lat, techs } = req.body

        const devs = await DevModel.find({
            techs: {
                $in: techs
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [long, lat]
                    },
                    $maxDistance: 10000
                }
            }
        })

        return res.json(devs)
    },

    registerDev: async (req, res) => {
        const { github_username, techs: _techs, lat, long } = req.body
        const techs = _techs.map(techName => techName.toLowerCase())

        const userByUsername = await axios.get(`${githubUsersUri}/${github_username}`)

        if (userByUsername.message) return res.json(userByUsername)

        const { name = login, avatar_url, bio = '', html_url: user_profile } = userByUsername.data

        const location = {
            type: 'Point',
            coordinates: [long, lat]
        }
        
        const devParams = {
            name,
            bio,
            github_username,
            techs,
            avatar_url,
            location,
            user_profile
        }

        try {
            Tech.find({ name: { $in: techs } }).then(techsExistents => {
                const _techsExistents = techsExistents.map(({name}) => name)
                const techsToAdd = techs.filter(name => !_techsExistents.includes(name))
                
                techsToAdd.map(techName => Tech.create({ name: techName }))
                
            })
            
            const dev = await DevModel.create(devParams)

            return res.json(dev)
        } catch (err) {
            throw res.send(err)
        }

    },

}