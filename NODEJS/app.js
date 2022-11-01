require('dotenv').config();

const apiRoutes = require('./src/modules/routes/routes');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(cors());

const URI = process.env.URL;

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/', apiRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`);
});