// rutas admin

const express = require('express');
const router = express.Router();
const { render } = require('ejs');
const { auth } = require("firebase-admin");

const { runInNewContext } = require('vm');

var firebase = require("firebase/app");
const { nextTick } = require('process');
require("firebase/auth");
var currentMail;

// ADMIN
var fireAdmin = require("firebase-admin");

var serviceAccount = require ("../serviceAccountKey.json");

fireAdmin.initializeApp({
    credential: fireAdmin.credential.cert(serviceAccount),
    databaseURL: 'https://apis-79efd-default-rtdb.firebaseio.com/'
  });


var db = fireAdmin.database();

var ref = db.ref("/restricted")

// tabla de usuarios
var usersRef = ref.child("users");



// CLIENTE
 
var firebaseConfig = require("../firebaseConfig.json");
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);



router.get('/', async function(req,res){
  res.render('index');
});

// REGISTER
router.post('/registered', async function(req,res){
  console.log(req.body);
  console.log(req.body.email);
  firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password)
  .then((userCredential) => {
    res.render("home");
    console.log("registrado cristianamente");
    var newUser={
      email: req.body.email,
    }
    usersRef.push(newUser);
    console.log("registrado en tabla");
  })
  .catch(error => {
    console.log(error);
  });
});  

// LOGIN
router.post('/home', async function(req,res){
  console.log(req.body);
  console.log(req.body.email);
  firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
  .then((userCredential) => {
    currentMail =  req.body.email;
    var text = "xd";
    res.render("home", {usersRef, currentMail});
    console.log("logueado cristianamente");
  })
  .catch(error => {
    console.log(error);
  });
}); 

router.post('/home/newImg', async function (req, res){
  console.log(req.body.url_link);
  console.log(req.body.title);
  var query = usersRef.orderByChild("email").equalTo(currentMail);

  query.once("value", function(snapshot) {
    snapshot.forEach(function(userSnapshot) {
        userSnapshot.ref.push({ // se crea un nuevo registro
          url: req.body.url_link,
          title: req.body.title
        });
    });
});

  res.end();
})

// ADD IMAGE
/*
var users = '<%- usersRef %>';
            var email = '<%-mail%>';
            users.orderByChild(email).push().set({
                memes: out.url
            });
            console.log(users.orderByChild(email));
            */

router.get('/logout', async function(req,res){
  firebase.auth().signOut().then(function() {
    console.log("deslogueado unu");
    res.render('index');
  }, function(error) {
    console.error('Sign Out Error', error);
  });
});







//// FIREBASE ADMIN ///////////

/*
 
var firebase = require("firebase-admin");

var serviceAccount = require ("../serviceAccountKey.json");

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
}).use('/userRoutes', userRoutes);
 

// login
router.post("/home", async function(req, res){
  
});
*/

module.exports = router; 

/*
export function addImg(url){
  usersRef.orderByChild(currentMail).push().set({
    memes: url
  });
}
*/