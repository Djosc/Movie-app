const package = require('./package.json');
const express = require('express');
const fetch = require('node-fetch-npm');
const path = require('path');
require('dotenv').config();

const app = express();
const port = 5000;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
});

app.get('/movies', async (request, response) => {
    const APIKEY = process.env.APIKEY;
    const APIURL = `https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}&language=en-US&page=1`;
    const posterURL = 'https://image.tmdb.org/t/p/w1280';

    const fetch_response = await fetch(APIURL);
    const json = await fetch_response.json();
    response.json(json);
});

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});