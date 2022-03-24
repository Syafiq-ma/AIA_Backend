const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
const dataRoutes = require('./routes/dataRoutes')
const searchRoutes = require('./routes/searchRoutes')

app.use(bodyParser.json());
app.use(cors());


app.use([dataRoutes,searchRoutes])
app.listen(process.env.PORT || 5000);

module.exports = app