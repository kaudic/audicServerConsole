const utils = require('./helpers/utils');

const controller = {

    homePage: (req, res) => {
        res.render('console.ejs');
    },
    loggIn: (req, res) => {
        // get the login and password from the request body
        const { login, password } = req.body;
        console.log(login, password, process.env.LOGIN, process.env.PASSWORD);

        // check if info are correct
        if (login === process.env.LOGIN && password === process.env.PASSWORD) {
            // if yes then register user info in session
            req.session.user = {
                login, password
            };
            return res.json({
                result: true,
                message: 'Les informations de connexion ne sont pas correctes'
            });

        } else {
            return res.json({
                result: false,
                message: 'Les informations de connexion ne sont pas correctes'
            });

        }
    }


};

module.exports = controller;