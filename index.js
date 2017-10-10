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


//copying from AJ


// app.use(passport.initialize());
// app.use(passport.session());
//
// // using passport to access auth0
// // { domain: config.auth0.domain ... etc}
// passport.use(new Auth0Strategy({
//     domain,
//     clientID,
//     clientSecret,
//     callbackURL:  '/auth/callback'
//    }, (accessToken, refreshToken, extraParams, profile, done) => {
//      //Find user in database
//      console.log(profile);
//      const db = app.get('db');
//      // .then means this is a promise
//      db.getUserByAuthId([profile._json.sub]).then((user, err) => {
//          console.log('INITIAL: ', user);
//        if (!user[0]) { //if there isn't a user, we'll create one!
//          console.log('CREATING USER');
//          db.createUserByAuth([profile._json.sub]).then((user, err) => {
//            console.log('USER CREATED', user[0]);
//            return done(err, user[0]); // GOES TO SERIALIZE USER
//          })
//        } else { //when we find the user, return it
//          console.log('FOUND USER', user[0]);
//          return done(err, user[0]);
//        }
//      });
//    }
//  ));
//
// // put user on session
//  passport.serializeUser((user, done) => {
//      done(null, user);
//  });
//
// // pull user from session for manipulation
//  passport.deserializeUser((user, done) => {
//      console.log(user);
//      done(null, user);
//  });


//end copying from AJ

//create end points for database
app.get( '/users', userctrl.getUsers );
app.get('/clients', userctrl.getClients );


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
  passport.authenticate('auth0', {}), function (req, res, done) {

  console.log("req.user", req.user._json.sub)
  const dbInstance=req.app.get('db');

  dbInstance.get_user_by_authid([req.user._json.sub])
    .then((user, err) => {
      console.log("getting user", user)
      if (!user[0]) {
        dbInstance.create_user_by_authid([req.user._json.sub])
          .then((user, err) => {
            console.log("creating user", user)
            return done (err, user[0])
          })
      } else {
        return done (err, user[0])
      }
    });

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
