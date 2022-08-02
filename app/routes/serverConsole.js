// importation des packages express
const express = require('express');
const router = express.Router();
const path = require('path');

// Importation des helpers
const controllerHandler = require('../helpers/controllerHandler');

// Importation des controleurs
const controller = require('../controller');

// Imports of middlewares
const auth = require('../middlewares/sessionAuth');

// Define a static specific for this console app
const imgStaticPath = path.normalize(`${__dirname}/../../public`);
router.use(express.static(imgStaticPath));

// Welcoming Page
router.get('/', auth, controllerHandler(controller.homePage));

// we use the class body parser middlewares for this app only --- NOT for the proxied requests, it will cause problems
// Log in if "auth" at previous route didn't work
router.post('/', express.json(), controllerHandler(controller.loggIn));


module.exports = router;