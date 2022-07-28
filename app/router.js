// imports modules for Router
const express = require('express');
const router = express.Router();
const auth = require('./middlewares/auth');
const controller = require('./controller');
const httpProxy = require('http-proxy');

// Create a reverse proxy to follow the request to other applications running on different ports
const proxy = httpProxy.createProxyServer({});

// Route for welcoming page - controling token first
router.get('/', auth, controller.homePage);
router.get('/imagesApp', (req, res) => {
    console.log('coucou');
    // it will forward the request to imagesApp which is running on audicserver on port 4000 - ip below is the audicserver computer
    proxy.web(req, res, { target: 'http://192.168.1.18:4000' });
    console.log('coucou2');
});

// listenning to the proxy server events
proxy.on('error', (err, req, res) => {
    console.log('got an error : ', err)
});

proxy.on('proxyRes', (proxyRes, req, res) => {

    let bodyContent = "";

    proxyRes.on('data', function (data) {
        data = data.toString('utf-8');
        bodyContent += data;
        // console.log(bodyContent);
    });

    console.log(bodyContent);

    res.headers = proxyRes.headers;
    res.send(bodyContent);
});


// Route for Logging in
router.post('/', controller.loggIn);

module.exports = router;