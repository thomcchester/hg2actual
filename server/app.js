var express = require('express');
var app = express();
var cookieParser = require('cookieParser');
var bodyParser = require('body-parser');
var passport= require('passport');
var session = require('express-session');
var localStrategy = require('passport-local');
var mongoose = require('mongoose');


//models


//routes
var index = require('./routes/index.js');

//database
var mongoURI =  process.env.MONGODB_URI || process.env.MONGODHQ_URL || "
mongodb://localhost/hgtwo";
var mongoDB= mongoose.connect(mongoURI).connection;
var defaultsExist = null;

// database setup
  mongoDB.on('error', function(err){
    console.log("mongo Yo :", err);
  });
  mongoDB.once('open', function(err){
    if(!err){console.log('mongo connection open');}
    else if(err){console.log('there was error opening:', err)}
  })

  var conn = mongoose.createConnection(mongoURI);
  conn.on('open',function(){
    conn.db.listCollections().toArray(function(err, names){
      if(names.length==0){
        defaultsExist = false;
      }else{
        defaultsExist = true
      }
      conn.close();
    });
  });
