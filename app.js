const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const app = express()

//routes files
const usersRoutes = require('./api/routes/user')
const rolesRoutes = require('./api/routes/role')
const statusesRoutes = require('./api/routes/status')
const ticketsRoutes = require('./api/routes/ticket')

//configs
app.use(express.json())
app.use(express.urlencoded({extends: false}))
app.use(morgan('dev'))
//routes ap
app.use('/api/users', usersRoutes)
app.use('/api/roles', rolesRoutes)
app.use('/api/statuses', statusesRoutes)
app.use('/api/tickets', ticketsRoutes)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});
app.use((req, res, next) => {
    const error = new Error('Not found')
    error.status = 404
    next(error)
})
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})
mongoose.connect('mongodb://localhost/tickets')
.then(db => {
    console.log('DB connected')
    
})
.catch(err => {
    console.log('Error connecting to the db: ' + err)
})

module.exports = app
