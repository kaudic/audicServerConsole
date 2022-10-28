// importation des packages express
const express = require('express');
const router = express.Router();

// Imports of middlewares
const auth = require('../middlewares/sessionAuth');

// REVERSE PROXY 
const httpProxy = require('http-proxy');

// proxy for requests (all except images and we will send string)
const proxy = httpProxy.createProxyServer({});

// router.use(auth);

// All request starting with /recipesAppBack will be here
router.use('/', (req, res) => {
    // forward requests to target app with WEBSOCKET OPTION To true
    if (process.env.NODE_ENV === 'production') {
        console.log('Request received in Proxy Prod for prevAppApi');
        proxy.web(req, res, { target: 'http://192.168.1.18:3004', ws: true });
    } else {
        proxy.web(req, res, { target: 'http://localhost:3004', ws: true });
    }
});

// listenning to the proxy server events
proxy.on('error', (err, req, res) => {
    console.log('got an error : ', err)
});

// Listen to the `upgrade` event and proxy the
// WebSocket requests as well.
//
proxy.on('upgrade', function (req, socket, head) {
    console.log('upgrade en cours');
    proxy.ws(req, socket);
});



module.exports = router;