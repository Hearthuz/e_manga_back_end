const express = require('express');
const morgan = require('morgan');

const mangaRoutes = require('./routes/manga');

const app = express();

// // Setting up middleware
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

// Setting up routes
app.use('/manga', mangaRoutes);

// Creating a server
app.listen(8080, () => {
    console.log('Listening on port 8080');
});