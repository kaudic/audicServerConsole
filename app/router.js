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

    bodyContent = `<!DOCTYPE html>
    <html lang="fr">
    
    </html>
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="preload" href="imagesApp/css/style.css" as="style">
        <link rel="stylesheet" href="imagesApp/css/style.css">
    </head>
    
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="https://kit.fontawesome.com/7a7244ff73.js" crossorigin="anonymous"></script><nav class="nav">
    <ul class="nav__list">
        <li><a id="index" href="/tags" class="nav__listItem">Tag Images</a>
        </li>
        <li><a id="portfolio" href="/upload" class="nav__listItem">Upload</li></a>
        <li><a id="apropos" href="/search" class="nav__listItem">Search</li></a>
    </ul>
</nav><body>
<main class="main">
    <div class="consoleContainer">
        <p>coucou</p>
    </div>
</main>

<script type="text/javascript" src="imagesApp/js/app.js" defer></script>
</body>`;

    res.headers = proxyRes.headers;
    res.send(bodyContent);
});


// Route for Logging in
router.post('/', controller.loggIn);

module.exports = router;