const express = require("express");
const WrapAsync = require("../utils/wrapAsync");
const router = express.Router();
const passport = require("passport");
const { saveRedirectUrl } = require("../midleware.js");
const userControler = require("../controler/user.js");

router.route("/signup")
    .get( userControler.renderSignup)
    .post(WrapAsync (userControler.successSignup));

router.route("/login")
    .get(userControler.renderLogin)
    .post(saveRedirectUrl,passport.authenticate("local", {failureRedirect: "/login", failureFlash: true,}), userControler.successLogin);


router.get("/logout", userControler.successLogout);

module.exports = router;