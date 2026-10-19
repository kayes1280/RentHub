const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");

const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const session = require("express-session");
const flash = require("connect-flash");


const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));
app.engine("ejs", ejsMate);

const sessionOptions = {
    secret: "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


main().then(() => {console.log("mongoose are connected")})
.catch(err => {
    console.log(err);
});

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/renthub');
}

// app.get("/" , (req, res) => {
//     res.send("app are working now");
// });

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
})

// app.get("/demouser", async (req, res) => {
//     let fakeuser = new User({
//         email: "kayes@gmail.com",
//         username: "kayeskhan",
//     });
//     let regiUser = await User.register(fakeuser, "kayeskhan");
//     res.send(regiUser);
// })

app.use("/listing", listingRouter);
app.use("/listing/:id/reviews", reviewRouter);
app.use("/", userRouter);


// for all error handler
app.use((req, res, next)=> {
    next(new ExpressError(404, "page not found!"));
});

// error handler
app.use((err, req, res, next)=> {
    let { status = 404 , message = " something went wrong !"} = err;
    res.status(status).render("showError.ejs", { message });
    // res.status(status).send(message);
})

// app.get("/testListing", async (req, res) => {
//     let sampleListing = new Listing({
//         title: "my new home",
//         description: "By the beach",
//         price: 1200,
//         location: "dhaka",
//         country: "Bd",
//     });
//     await sampleListing.save();
//     console.log(sampleListing);
//     res.send("success");
// })

app.listen("5173", ()=> {
    console.log("app listening now");
})