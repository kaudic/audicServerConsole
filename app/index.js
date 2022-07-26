const express = require('express');
const router = require('./routes');
const session = require('express-session');
const app = express();

app.use((req, res, next) => {
    console.log('request received');
    next();
})

// first middlewares
app.use(session({
    secret: 'TheBestAudicServerSecret',
    resave: true,
    saveUninitialized: true,
    name: '__session',
    cookie: {
        maxAge: process.env.SESSION_MINUTES * 60 * 1000
    }
}));

app.set('views', `${process.cwd()}/app/views`);
app.set('view engine', 'ejs');

// go to router
app.use(router);

module.exports = app;