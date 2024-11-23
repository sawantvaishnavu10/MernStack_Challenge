require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const transactionRoutes = require('../backend/Routes/Trasactions');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/api', transactionRoutes);

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(process.env.PORT || 5000, () => console.log('Server running')))
  .catch((err) => console.error(err));
