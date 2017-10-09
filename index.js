const express = require('express');
const session = require('express-session');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const strategy = require('./server/strategy.js')
const massive = require('massive');
const config = require('./server/config.js')


const userctrl = require('./userctrl.js')
// const { secret } = require('./server/config').session;
// console.log(secret);


massive(config.postgres).then(instance => {
  app.set('db', instance)
})
.catch( err => {
  console.log( err )
})

const {clientSecret, dbUser, database} = require('./server/config.js');
// const strategy = require()

const bodyParser  = require('body-parser');

const port = 3000;

const app = express();

// app.use(session({secret: 'some-random-string'}))
app.use('/', express.static(__dirname))
app.use(session({
  secret: 'some-random-string',
  resave: true,
  saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())
passport.use(strategy);

//need the resave and unint to get rid of warning


//create end points for database
app.get( '/users', userctrl.get );



passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});



// app.get('/login',
//   passport.authenticate('auth0', {}), function (req, res) {
//   res.redirect("/#/");
// });

app.get('/login',
  passport.authenticate('auth0', {}), function (req, res) {
  res.redirect("/#/clients/form");

});


// app.get('/auth', passport.authenticate ('auth0'));
// app.get('/auth/callback', passport.authenticate('auth0', { successRedirect: '/'}));
// app.get('/auth/callback', passport.authenticate('auth0', { successRedirect: '/clients/form'}));

//
// app.get('/auth/me', function(req, res, next) {
// if (!req.user) return res.status(404).json({err: "No user on req"});
// res.status(200).send(req.user);
// })


app.listen(port, function(){
  console.log(`Listening on port ${port}!!!`)
})
