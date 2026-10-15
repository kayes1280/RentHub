const User = require("../models/user.js");

module.exports.renderSignup = (req, res)=> {
    res.render("user/signup.ejs");
};

module.exports.successSignup = async(req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({username, email});
        const regiUser = await User.register(newUser, password);
        // console.log(regiUser);
        req.login(regiUser, (err) => {
            if(err) {
                return next(err);
            }
            req.flash("success", "welcome to renthub");
            res.redirect("/listing");
        });
        
    } catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    };
    
};

module.exports.renderLogin = (req, res) => {
    res.render("user/login.ejs");
};

module.exports.successLogin = async(req, res) => {
        req.flash("success", "welcome to renthub");
        let redirectUrl = res.locals.redirectUrl || "/listing";
        res.redirect(redirectUrl);
};

module.exports.successLogout = (req, res, next)=> {
    req.logout((err)=> {
        if(err) {
            return next(err);
        }
        req.flash("success", "logged out successfully");
        res.redirect("/listing");
    })
};