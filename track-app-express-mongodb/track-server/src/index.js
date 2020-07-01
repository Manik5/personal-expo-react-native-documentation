require('./models/User');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);

const mongoUri = 'mongodb+srv://admin:adminpassword@cluster0.f4cn5.mongodb.net/<dbname>?retryWrites=true&w=majority'
mongoose.connect(mongoUri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})
.then(() => console.log('MongoDB Connected...'))
.catch(error => console.log(error));

mongoose.connection.on('connected', () => {
  console.log('Connected to mongo instance');
});

mongoose.connection.on('error', (err) => {
  console.log('Error connecting to mongo', err);
});

app.get('/', (req, res) => {
  res.send('Hi there!');
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
