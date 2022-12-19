const apiRoutes = require('./src/modules/routes/routes');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(cors());

const URI = 'mongodb+srv://nkharkevichitrum:qwedsaq12Q@cluster0.y6syylw.mongodb.net/expo-todo-native';

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/', apiRoutes);

app.listen(8000, "192.168.88.222", () => {
    console.log(`Expo 8000!`);
});