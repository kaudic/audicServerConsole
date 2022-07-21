const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const utils = {

    generateToken: (user) => {
        return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3600s' });
    }
};

module.exports = utils;