const PORT = process.env.PORT || 3000
const express = require('express')
const app = express()
const authenticate = require('./auth.js')
const session = require('express-session')
const passport = require('passport')

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1000*10}
  }));
app.use(passport.authenticate('session'));
app.use('/', authenticate)

app.get('/home', (req, res, next) => {
    if(!req.user) return res.redirect('/login')
    res.sendFile("/pages/home.html", { root: __dirname });
})

app.listen(PORT, () => {
    console.log(`Server start at port ${PORT}`)
})