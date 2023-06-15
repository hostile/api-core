const { Route, Parameter } = require('../index');
const { standardizeUsername } = require("../core/parameter/standardization");

const axios = require('axios');

module.exports = new Route('GET', '/cashapp')
    .setParameters([
        new Parameter()
            .setName('username')
            .setRequired(true)
            .setValidationFunction((username) => standardizeUsername(username))
    ])
    .setHandler(async (req, res) => {
        const username = req.queryParams.username;
        const response = await axios.get(`https://cash.app/$${username}`);

        res.status(200).json({
            status: 'success',
            data: JSON.parse(response.data.split('profile: ')[1].split('\n')[0])
        });
    });
