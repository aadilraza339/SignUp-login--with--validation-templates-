const express = require('express');
const bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');

require('dotenv').config()
const app = express();
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const usersRouter = require('./Routes/user.routes');

app.use('/', usersRouter);

// server running
app.listen(process.env.PORT || 3000, () => {
    console.log("Node server started");
});

module.exports = app;


