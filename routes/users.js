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
    const { username, password, fname, lname, email, permissionLevel, series, buyedBooks, favoriteBooks, cart } = req.body;
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
        favoriteBooks,
        cart
    };
    users.push(user);
    res.json(users);
    res.sendStatus(201);
});

router.post('/:id/favorite', (req, res) => {
    const userId = Number.parseInt(req.params.id);
    const user = users.find((user) => user.id === userId);
    const { id, name, price, imageURL } = req.body;

    const data = {
        id: id,
        name: name,
        price: price,
        imageURL: imageURL
    }

    user.favoriteBooks.push(data);
    res.json(users);
});

router.post('/:id/cart', (req, res) => {
    const userId = Number.parseInt(req.params.id);
    const user = users.find((user) => user.id === userId);
    const { id, name, price, imageURL } = req.body;

    const data = {
        id: id,
        name: name,
        price: price,
        imageURL: imageURL
    }

    user.cart.push(data);
    res.json(users);
});

router.post('/:id/buyed', (req, res) => {
    const userId = Number.parseInt(req.params.id);
    const user = users.find((user) => user.id === userId);
    const { id, name, price, imageURL } = req.body;

    const data = {
        id: id,
        name: name,
        price: price,
        imageURL: imageURL
    }

    user.buyedBooks.push(data);
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
    const userIndex = users.findIndex((user) => user.id === userId);
    console.log(userIndex);
    users.splice(userIndex, 1);
    res.sendStatus(204);
});

router.delete('/:id/cart/:manga', (req, res) => {
    const userId = Number.parseInt(req.params.id);
    const userData = users.find((user) => user.id === userId);
    const userIndex = users.findIndex((user) => user.id === userId);

    const cartData = userData.cart;

    const mangaId = Number.parseInt(req.params.manga);
    const mangaIndex = cartData.findIndex((cart) => cart.id === mangaId);
    users[userIndex].cart.splice(mangaIndex, 1);
    res.sendStatus(204);
});

router.delete('/:id/favorite/:manga', (req, res) => {
    const userId = Number.parseInt(req.params.id);
    const userData = users.find((user) => user.id === userId);
    const userIndex = users.findIndex((user) => user.id === userId);

    const favData = userData.favoriteBooks;

    const mangaId = Number.parseInt(req.params.manga);
    const mangaIndex = favData.findIndex((fav) => fav.id === mangaId);
    users[userIndex].favoriteBooks.splice(mangaIndex, 1);
    res.sendStatus(204);
});

module.exports = router;