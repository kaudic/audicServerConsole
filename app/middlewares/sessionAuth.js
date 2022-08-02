const sessionAuth = (req, res, next) => {

    // check if user attribute exist in session and if yes check login and password
    if (req.session.user) {
        const user = req.session.user;

        if (user.login === process.env.LOGIN && user.password === process.env.PASSWORD) {
            return next();
        } else {
            // if user session doesn't have right login and/ord password then render the login pag
            return res.render('login.ejs');
        }
    }


    // if no user in session then render login page
    if (!req.session.user) {
        return res.render('login.ejs');
    }




};

module.exports = sessionAuth;
