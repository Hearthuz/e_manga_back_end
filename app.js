const express = require('express');
const morgan = require('morgan');

const mangaRoutes = require('./routes/manga');
const usersRoutes = require('./routes/users');
const cors = require('cors');

const app = express();

// // Setting up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('tiny'));
const corsOptions = {
    origin: 'https://localhost:3000',
    optionsSuccessStatus: 200
}
app.use(cors());
// Setting up routes
app.use('/manga', mangaRoutes);
app.use('/users', usersRoutes);

// Creating a server
app.listen(8080, () => {
    console.log('Listening on port 8080');
});