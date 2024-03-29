const express = require('express');
const routes = require('./Routes');
const cors = require('cors')

const app = express();
require('./config/dbConfig');

app.use(cors());
app.use(express.json());
app.use(routes);


app.listen(5002);
