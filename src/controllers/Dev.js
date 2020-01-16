const axios = require('axios')
const DevModel = require('../models/Dev')

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
        const { github_username, techs, lat, long } = req.body

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
            const dev = await DevModel.create(devParams)
            return res.json(dev)
        } catch (err) {
            throw res.send(err)
        }

    },

}