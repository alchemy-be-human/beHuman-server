const express = require('express');
const app = express();

app.use(express.json());


app.use('/api/v1/links', require('./controllers/links'));

app.use('/api/v1/tips', require('./controllers/tips'));
app.use('/api/v1/links', require('./controllers/links'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
