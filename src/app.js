const express = require('express');

const app = express();

app.use(express.json());

app.get('/api/v1', (req, res) => {

});

module.exports = app;