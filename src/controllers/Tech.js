const Tech = require('../models/Tech')

module.exports = {

    getAll: async (req, res) => {
        const techs = await Tech.find()

        return res.json(techs)
    },

}