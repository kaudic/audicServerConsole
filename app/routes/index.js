// importation des modules pour le router
const express = require('express');
const router = express.Router();

// Importation des routeurs secondaires
const serverConsole = require('./serverConsole');
const imagesAppRouter = require('./imagesApp');
const recipesAppFrontRouter = require('./recipesAppFront');
const recipesAppBackRouter = require('./recipesAppBack');

// Appel aux routeurs secondaires
router.use('/', serverConsole);
router.use('/imagesApp', imagesAppRouter);
router.use('/recipesAppFront', recipesAppFrontRouter);
router.use('/recipesAppBack', recipesAppBackRouter);

// router.use('/socket.io', imagesAppRouter);


module.exports = router;