const express = require('express');

const users = require('../api/users');

const router = express.Router();

router.get('/', (req, res) => {
    res.send(users);
});

router.get('/:id', (req, res) => {
    const userId = Number.parseInt(req.params.id);
    const user = users.find((user) => user.id === userId);
    res.json(user);
});

let currentId = 2;
router.post('/', (req, res) => {
    const { username, password, fname, lname, email, permissionLevel, series, buyedBooks, favouriteBooks } = req.body;
    const user = {
        id: ++currentId,
        username,
        password,
        fname,
        lname,
        email,
        permissionLevel,
        series,
        buyedBooks,
        favouriteBooks,
    };
    users.push(user);
    res.json(users);
    res.sendStatus(201);
});

router.post('/:id', (req, res) => {
    const userId = Number.parseInt(req.params.id);
    const user = users.find((user) => user.id === userId);

    const data = req.body;;

    user.favoriteBooks.push(data);
    res.json(users);
});

router.put('/:id', (req, res) => {
    const { username, password, fname, lname, email, permissionLevel, series, buyedBooks, favouriteBooks } = req.body;
    const userId = Number.parseInt(req.params.id);
    const user = users.find((user) => user.id === userId);

    user.username = username;
    user.password = password;
    user.fname = fname;
    user.lname = lname;
    user.email = email;
    user.permissionLevel = permissionLevel;
    user.buyedBooks = buyedBooks;
    user.series = series;
    user.favouriteBooks = favouriteBooks;

    res.json(user);
})

router.delete('/:id', (req, res) => {
    const userId = Number.parseInt(req.params.id);
    const userIndex = users.find((user) => user.id === userId);
    users.splice(userIndex, 1);
    res.sendStatus(204);
});

module.exports = router;