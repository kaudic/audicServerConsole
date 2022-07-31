// importation des modules pour le router
const express = require('express');
const router = express.Router();


// Importation des routeurs secondaires
const serverConsole = require('./serverConsole');
const imagesAppRouter = require('./imagesApp');

// Appel aux routeurs secondaires
router.use('/', serverConsole);
router.use('/imagesApp', imagesAppRouter);


module.exports = router;