const express = require('express');
const router = express.Router();
const { render } = require('ejs');

var firebase = require("firebase-admin");

var serviceAccount = require ("../serviceAccountKey.json");
const { runInNewContext } = require('vm');

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: 'https://apis-79efd-default-rtdb.firebaseio.com/'
  });


var db = firebase.database();

var ref = db.ref("/restricted")

var usersRef = ref.child("users");



usersRef.set({
    carrr105:{
        date_of_birth: "1-jun-1980",
        full_name: "carlos herrera"
    }
}
);


router.get('/', async function(req,res){
    res.render('index');
});

router.post('/registered', async function(req,res){
    console.log(req.body);
    firebase.auth().createUser({
        email: req.body.email,
        emailVerified: false,
        password: req.body.password,
        disabled: false,
      })
      .then((userRecord) => {
        // See the UserRecord reference doc for the contents of userRecord.
        var newUser={
            email: req.body.email,
        }
        usersRef.push(newUser);
        console.log('Successfully created new user:', userRecord.uid);
        res.render('home');
      })
      .catch((error) => {
        console.log('Error creating new user:', error);
        res.redirect('/');
      });
});

module.exports = router; 

 