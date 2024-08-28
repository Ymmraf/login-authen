const express = require("express");
const app = express();
const router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local");
const { findUser, users } = require("./user.js");

passport.use(
  new LocalStrategy((username, password, done) => {
    const user = findUser(username)[0];
    if (!user) return done(null, false);
    if (user.password !== password) return done(null, false);
    return done(null, user);
  })
);

passport.serializeUser((user, done) => {
  process.nextTick(function () {
    done(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser((user, done) => {
  process.nextTick(function () {
    return done(null, user);
  });
});

router.get("/login", (req, res, next) => {
  res.sendFile("/pages/login.html", { root: __dirname });
});

router.post(
  "/login/password",
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/login",
  })
);

router.post('/logout', (req, res, next) => {
    req.logout((err) => {
      if (err) { return next(err); }
      res.redirect('/login');
    });
  });

module.exports = router;
