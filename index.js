const express = require('express');
const session = require('express-session');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const strategy = require('./server/strategy.js')
const massive = require('massive');
const config = require('./server/config.js');
const bodyParser  = require('body-parser');


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
app.use(bodyParser.json());
passport.use(strategy);

//create end points for database
app.get( '/users', userctrl.getUsers );
app.get('/clients', userctrl.getClients );

//session test
app.get('/auth/session', (req, res, next )=> {
  console.log(req.user)
  res.send(req.session);
})
// app.put('/clients/form', userctrl.updateUser );

//update user info the first time a user logs in
// app.post('/users', userctrl.update_user);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});



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

//update user info when submitting form
app.put('/user', (req, res, next) => {
  const dbInstance = req.app.get('db');
  console.log("server update user", req.body )
    // dbInstance.update_user([req.body]);


  //   const {lastname, firstname, role} = req.body;
  // dbInstance.update_user([req.user])

  // dbInstance.update_user([lastname, firstname, role]).then( response => {
  //   console.log(res)
  // })

  //  dbInstance.update_user([lastname, firstname, role])
  // .then( () => res.status(200).send() )
  // .catch( () => res.status(500).send() );

});




app.listen(port, function(){
  console.log(`Listening on port ${port}!!!`)
})




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
