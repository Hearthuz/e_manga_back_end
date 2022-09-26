const express = require('express');

const { data } = require('../api/data');

const router = express.Router();

router.get('/', (req, res) => {
    const filters = req.query;
    const filteredManga = data.filter(manga => {
        let isValid = true;
        for (key in filters) {
            isValid = isValid && manga[key].startsWith(filters[key]);
        }
        return isValid;
    });
    res.json(filteredManga);
});

router.get('/:id', (req, res) => {
    const mangaId = Number.parseInt(req.params.id);
    const manga = data.find((manga) => manga.id === mangaId);
    res.json(manga);
});

router.post('/', (req, res) => {
    const { name, imageURL, author, published, publisher, seriesName, synopsis, price, genre } = req.body;
    const manga = {
        id: 2,
        name,
        imageURL,
        author,
        published,
        publisher,
        seriesName,
        synopsis,
        price,
        genre
    };
    data.push(manga);
    res.json(data);
    res.sendStatus(201);
});

router.put('/:id', (req, res) => {
    const { name, imageURL, author, published, publisher, seriesName, synopsis, price, genre } = req.body;
    const mangaId = Number.parseInt(req.params.id);
    const manga = data.find((manga) => manga.id === mangaId);

    manga.name = name;
    manga.imageURL = imageURL;
    manga.author = author;
    manga.published = published;
    manga.publisher = publisher;
    manga.seriesName = seriesName;
    manga.synopsis = synopsis;
    manga.price = price;
    manga.genre = genre;

    res.json(manga);
})

router.delete('/:id', (req, res) => {
    const mangaId = Number.parseInt(req.params.id);
    const mangaIndex = data.find((manga) => manga.id === mangaId);
    data.splice(mangaIndex, 1);
    res.sendStatus(204);
});

module.exports = router;