const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importe o pacote cors

const app = express();
const port = 3000;

app.use(cors()); // Habilita o CORS para todas as requisições

app.use(bodyParser.json());

mongoose.connect('mongodb://mongo:27017/notifications', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

const DataSchema = new mongoose.Schema({
    processId: String,
    status: String,
    phone: String,
    name: String,
    message: String
});

const Data = mongoose.model('notification', DataSchema);

app.post('/notificate/', async (req, res) => {
  const { name, phone, message } = req.body;
  const processId = '123456789';
  const status = 'success';
  const newData = new Data({ processId, name, message, phone, status });
  try {
    await newData.save();
    res.status(201).send(newData);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/notifications/', async (req, res) => {
  try {
    const data = await Data.find();
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
