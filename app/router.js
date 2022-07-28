// imports modules for Router
const express = require('express');
const router = express.Router();
const auth = require('./middlewares/auth');
const controller = require('./controller');
const httpProxy = require('http-proxy');
const path = require('path');

// Create a reverse proxy to follow the request to other applications running on different ports
const proxy = httpProxy.createProxyServer({});

// Route for welcoming page - controling token first
router.get('/', auth, controller.homePage);
router.get('/imagesApp', (req, res) => {
    // we cut "/imagesApp" as in the local App it starts from "/"
    // delete req.headers.host;
    // req.url = req.url.replace('/api/v1', '/');

    // forward the request to app "magesApp" which is running on audicserver on port 4000 - ip below is the audicserver computer
    // selfHandleResponse will enable on below events to modify the response
    proxy.web(req, res, { target: 'http://192.168.1.18:4000', selfHandleResponse: true });
});

// listenning to the proxy server events
proxy.on('error', (err, req, res) => {
    console.log('got an error : ', err)
});

proxy.on('proxyRes', (proxyRes, req, res) => {
    var body = [];
    proxyRes.on('data', function (chunk) {
        body.push(chunk);
    });
    proxyRes.on('end', function () {
        body = Buffer.concat(body).toString();

        // need to parse the body to replace the path of the css
        const missingDirectory = path.normalize(`${__dirname}/../../imagesApp/public`);
        // body = body.replace('/css', `${missingDirectory}/css`).replace('/css', `${missingDirectory}/css`);
        // body = body.replace('/js', `${missingDirectory}/js`);

        // console.log('missingDirectory: ' + missingDirectory);

        console.log("res from proxied server:", body);
        res.end(body);
    });

});


// Route for Logging in
router.post('/', controller.loggIn);

module.exports = router;