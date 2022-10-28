const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
require('dotenv').config();

const apiRoutes = require('./src/modules/routes/routes');

app.use(cors());

const uri = process.env.URL;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/', apiRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`);
});