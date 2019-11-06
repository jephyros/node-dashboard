const express  = require('express')
      ,engine = require('ejs-locals')
      ,app = express()




const loginRoutes = require('./routes/login')
const dashboardRoutes = require('./routes/dashboard')
const mainRoutes = require('./routes/main')

app.use(express.static('public'))
app.set('view engine','ejs')
app.engine('ejs', engine)

//Router
app.use('/',mainRoutes)
app.use('/login',loginRoutes)
app.use('/dashboard',dashboardRoutes)


module.exports = app

