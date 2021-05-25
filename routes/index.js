// rutas admin

const express = require('express');
const router = express.Router();
const { render } = require('ejs');
const { auth } = require("firebase-admin");

const { runInNewContext } = require('vm');

var firebase = require("firebase/app");
const { nextTick } = require('process');
require("firebase/auth");

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

var firebaseConfig = {
    apiKey: "AIzaSyB0DIv2GlkQqVEz4tJZnTmpsMMK3o0RoQQ",
    authDomain: "apis-79efd.firebaseapp.com",
    databaseURL: "https://apis-79efd-default-rtdb.firebaseio.com",
    projectId: "apis-79efd",
    storageBucket: "apis-79efd.appspot.com",
    messagingSenderId: "306913296738",
    appId: "1:306913296738:web:1cb5b09f77c7c961e02c3b",
    measurementId: "G-4ML2DW1K5W"
  };
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
    res.redirect("home");
    console.log("registrado cristianamente");
  })
  .catch(error => {
    console.log(error);
  });
  var newUser={
    email: req.body.email,
  }
  usersRef.push(newUser);
  console.log("registrado en tabla");
}); 

// LOGIN
router.post('/home', async function(req,res){
  console.log(req.body);
  console.log(req.body.email);
  firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
  .then((userCredential) => {
    res.redirect("home");
    console.log("logueado cristianamente");
  })
  .catch(error => {
    console.log(error);
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

 