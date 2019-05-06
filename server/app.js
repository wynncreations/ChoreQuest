const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const session = require('express-session');


app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.use(cookieParser());

app.use(
    session({
        secret: "chorequest",
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false
        }
    })
);

const port = process.env.port || 8000;



//routes
const index =  require('./routes/index');

app.use('/api/',index);





app.listen(port,()=>{
    console.log(`Express Server online, port - ${port}`);
});