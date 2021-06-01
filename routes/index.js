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
    currentMail = req.body.email;
    console.log("new mail is " + req.body.email);
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

// Add image to account
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
});

router.get('/myMemes', async function (req, res){
  var query = usersRef.orderByChild("email").equalTo(currentMail);

  query.once("value", function(snapshot) {
    snapshot.forEach(function(userSnapshot) {
      console.log(snapshot.toJSON());
      console.log("hola0");
      var obj = snapshot.toJSON();
      var newObj;
      var titles = new Array();
      var urls = new Array();
      for (var key in obj) {
        console.log("Key: " + key);
        console.log("Value: " + obj[key]);
        newObj = obj[key];
    }
    //console.log(newObj);
    console.log("new object");
      for (var newKey in newObj){
        console.log("Key: " + newKey);
        if (typeof newObj[newKey].title === 'undefined' || typeof newObj[newKey].url === 'undefined'){
          // do nothing
        }
        else{
          console.log("title is: " + newObj[newKey].title);
          console.log("url is: " + newObj[newKey].url);
          titles.push(newObj[newKey].title);
          urls.push(newObj[newKey].url);
        }
      }
      console.log("items recovered");
      console.log(titles);
      console.log(urls);

      /*
      var obj = snapshot.toJSON();
      var titles =  obj[0][0].title;
      console.log(titles);
      */
     res.render("memes", {titles, urls});
    });
  });
});

router.get('/logout', async function(req,res){
  firebase.auth().signOut().then(function() {
    console.log("deslogueado unu");
    res.render('index');
  }, function(error) {
    console.error('Sign Out Error', error);
  });
});

router.post('/del', async function(req,res){
  var link = req.body.url_link;
  var query = usersRef.orderByChild("email").equalTo(currentMail);
// get email register
    query.once("value", function(snapshot) {
    snapshot.forEach(function(userSnapshot) {
      var keyUser = userSnapshot.key;
      console.log(userSnapshot.key+': '+userSnapshot.val());

      var query2 = usersRef.child(keyUser).orderByChild("url").equalTo(link);
// get img register and delete
  query2.once("value", function(sn) {
    sn.forEach(function(usn) {

      console.log("This image will be deleted");
      console.log(usn.toJSON());
      usn.ref.remove();

    });
  });

    });
  });
/*
  var query2 = usersRef.child(keyUser).orderByChild("url").equalTo(link);

  query2.once("value", function(snapshot) {
    snapshot.forEach(function(userSnapshot) {

      console.log("OK ITS HAPPENING");
      console.log(userSnapshot.key+': '+userSnapshot.val());
    });
  });
  */
    

  console.log("RECEIVED ON SERVER: " + link);
  res.end();
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