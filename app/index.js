const express = require('express');
const cors = require('cors');
const router = require('./routes');
const app = express();

// first middlewares

app.use(cors());
app.set('views', `${process.cwd()}/app/views`);
app.set('view engine', 'ejs');

// go to router
app.use(router);

module.exports = app;