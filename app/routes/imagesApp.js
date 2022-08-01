// importation des packages express
const express = require('express');
const router = express.Router();

// REVERSE PROXY 
const httpProxy = require('http-proxy');

// proxy for requests (all except images and we will send string)
const proxy = httpProxy.createProxyServer({});

// proxy for image (we will send buffer)
const imgProxy = httpProxy.createProxyServer({});

// this route will get the requests for statics images
router.get(/\/assets/, (req, res) => {
    // forward requests to target app
    if (process.env.NODE_ENV === 'production') {
        imgProxy.web(req, res, { target: 'http://192.168.1.18:4000', selfHandleResponse: true });
    } else {
        imgProxy.web(req, res, { target: 'http://localhost:4000', selfHandleResponse: true });
    }
});

// listenning to the Image proxy server events
imgProxy.on('error', (err, req, res) => {
    console.log('got an error on image Proxy : ', err)
});

imgProxy.on('proxyRes', async (proxyRes, req, res) => {
    var body = [];
    proxyRes.on('data', function (chunk) {
        body.push(chunk);
    });
    proxyRes.on('end', function () {
        body = Buffer.concat(body); // sending buffers
        res.end(body);
    });
});

// All request starting with /imagesApp will be here (except the ones having 'assets' in the req.url, they are treated by previous route)
router.use('/', (req, res) => {
    console.log(req.url);
    // forward requests to tagret app
    if (process.env.NODE_ENV === 'production') {
        console.log('IP prod');
        proxy.web(req, res, { target: 'http://192.168.1.18:4000', selfHandleResponse: true });
    } else {
        console.log('IP local');
        proxy.web(req, res, { target: 'http://localhost:4000', selfHandleResponse: true });
    }
});


// listenning to the proxy server events
proxy.on('error', (err, req, res) => {
    console.log('got an error : ', err)
});

// proxy.on('proxyReq', async (proxyReq, req, res) => {
//     if (req.body) {
//         const bodyData = JSON.stringify(req.body);
//         console.log(bodyData);
//         // incase if content-type is application/x-www-form-urlencoded -> we need to change to application/json
//         proxyReq.setHeader('Content-Type', 'application/json');
//         proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
//         // stream the content
//         proxyReq.write(bodyData);
//     }
// });

proxy.on('proxyRes', async (proxyRes, req, res) => {
    var body = [];
    proxyRes.on('data', function (chunk) {
        body.push(chunk);
    });
    proxyRes.on('end', function () {
        body = Buffer.concat(body).toString(); // sending string build from Buffer
        // console.log(body);
        res.end(body);
    });
});


module.exports = router;