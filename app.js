"use strict";
const express  = require('express')
      ,fs = require('fs')
      ,morgan = require('morgan')    
      ,engine = require('ejs-locals')      
      ,app = express();

// morgan Setting
morgan('combined');
// a format string
morgan(':remote-addr :method :url :uuid');
// a custom function
morgan(function (req, res) {
    return req.method + ' ' + req.url + ' ' + req.uuid;
})

const loginRoutes = require('./routes/login');
const dashboardRoutes = require('./routes/dashboard');
const mainRoutes = require('./routes/main');


app.use(morgan());
// app.use(morgan({
//     format: 'dev',
//     stream: fs.createWriteStream('./logs/access.log', {'flags': 'w'})
//   }));
app.use(express.static('public'));
app.set('view engine','ejs');
app.engine('ejs', engine);

//Router
app.use('/',mainRoutes);
app.use('/login',loginRoutes);
app.use('/dashboard',dashboardRoutes);


module.exports = app;

