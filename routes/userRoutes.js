const express = require("express");
const { auth } = require("firebase-admin");

const router = express.Router();

var firebase = require("firebase/app");
require("firebase/auth");





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



  router.post('/registered', async function(req,res){
    console.log(req.body);
    firebase.auth().createUserWithEmailAndPassword(req.params.email, req.params.password)
    .then((userCredential) => {
      res.redirect("home");
      console.log("logeado cristianamente");
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
    });
});


module.exports = router; 

 