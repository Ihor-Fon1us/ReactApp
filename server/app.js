const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const port = 5000;
app.use(express.json());

app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());
app.use(bodyParser.json());

const games = require('./routes/games');
const api = require('./routes/api');


app.use('/games', cors({origin: "http://localhost:3000", credentials: true}), games);
app.use('/api', cors({origin: "http://localhost:3000", credentials: true}), api);

app.listen(port, () => {
    console.log('Server started on port ' + port);
  });   