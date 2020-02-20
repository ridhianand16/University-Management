'use strict';
//packages
const bodyParser = require('body-parser');
const fs = require('fs');
const express = require('express');
const createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require("express-session");
const redis = require('redis');
const redisStore = require('connect-redis')(session);
const client  = redis.createClient(6379, '127.0.0.1');


//folders for 
var indexRouter = require('./routes/index');
var userRouter = require('./routes/users');
//var loginRouter = reruie('./routes/users/')
var loginScreen = require('./routes/loginscreen')
const router = express.Router();
//module.exports = router;
//__dirname = "./assignment1"
__dirname = "./"

const app = express();
app.use(express.json());
//app.use(express.urlencoded({entended: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: "secret",
    store: new redisStore({
        username:'test',
        client:client,
        host: 'localhost', 
        port: 6379, 
        ttl : 260
    }),
    saveUninitialized: false,
    resave: false
}));

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.use('/', loginScreen);
app.use('/users', userRouter);

//app.use('/login', __dirname + '/login')//not sure if this is right
//app.use('/student,')
 
/*app.get("/",function(req,res)
{
    res.render("login");
});*/

app.get('/',(req,res) => {  
    if(req.body.username) 
    {     
    req.session.username = req.body.username;
    console.log(req.session.username)
    res.render('login');
    }
    //res.end('done');
    /*if(sess.regno) {
        return res.redirect('/userdetails');
    }*/
});


/*app.post('/users/login',function(req, res) {
    req.session.username = req.body.username;
    console.log("yolo")
    res.end('done');
})

app.post('/users',function(req, res) {
    req.session.username = req.body.username;
    console.log(req.session.username)
    res.end('done');
})*/
//app.use('/', router);

     //logout route
     app.get('/logout', function(req, res) {
        req.session.destroy();
        //req.logout();
        //passportConfig.reset(); //reset auth tokens
        //res.redirect(config.uaaURL + '/logout?redirect=' + config.appURL);
        res.render("login");
      });

app.listen(8888);

//module.exports = app;