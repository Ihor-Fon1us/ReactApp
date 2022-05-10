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

const api = require('./routes/api');

app.use('/api', cors({origin: "http://localhost:3000"}), api);

app.listen(port, () => {
    console.log('Server started on port ' + port);
  });   