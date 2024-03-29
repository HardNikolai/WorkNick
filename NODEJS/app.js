require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const apiRoutes = require('./src/modules/routes/routes');
// 'mongodb+srv://nkharkevichitrum:qwedsaq12Q@cluster0.y6syylw.mongodb.net/accounting_records'

const app = express();
app.use(express.json());
app.use(cors());
app.use('/', apiRoutes);

const URI = process.env.URL;
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`);
});