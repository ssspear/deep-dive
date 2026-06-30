const createError = require('http-errors');
const logger = require('morgan');
const express = require('express');
const app = express();


// open up CORS 
app.use((_, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(logger('dev'));

// You can place your routes here, feel free to refactor:
const { example, creatures } = require('./routes');
app.use('/api/example', example)
app.use('/api/creatures', creatures)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    const isDev = req.app.get('env') === 'development';
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: isDev ? { stack: err.stack } : {},
    });
});

module.exports = app;