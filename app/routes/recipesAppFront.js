// importation des packages express
const express = require('express');
const router = express.Router();

// Imports of middlewares
const auth = require('../middlewares/sessionAuth');

// REVERSE PROXY 
const httpProxy = require('http-proxy');

// proxy for requests (all except images and we will send string)
const proxy = httpProxy.createProxyServer({});

router.use(auth);

// All request starting with /recipesAppFront will be here
router.use('/', (req, res) => {
    // forward requests to target app
    if (process.env.NODE_ENV === 'production') {
        console.log('Request received in Proxy Prod for recipesAppFront');
        proxy.web(req, res, { target: 'http://192.168.1.18:3002' });
    } else {
        proxy.web(req, res, { target: 'http://localhost:3002' });
    }
});

// listenning to the proxy server events
proxy.on('error', (err, req, res) => {
    console.log('got an error : ', err)
});



module.exports = router;