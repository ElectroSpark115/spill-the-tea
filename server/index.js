const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const TeaController = require('./TeaController');

const app = express();
const PORT = 3000;
const teaRouter = express.Router();

app.use(cors());
app.use(express.json());

// Connect Mongoose to MongoDB
mongoose
  .connect(
    'mongodb+srv://parkermasaru:p9N8FsKDw5nzsk7i@teacluster.t30wk3i.mongodb.net/?retryWrites=true&w=majority&appName=TeaCluster'
  )
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => console.log(`✅ Server running on ${PORT}`));
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
  });

// Express routes to know what to do when someone visits a specific URL
app.get('/', (req, res) => {
  res.send('Welcome to Spill the Tea');
});

// GET ALL TEA DATA
app.get('/api/teas', TeaController.getTeas, (req, res) => {
  if (res.locals.teas) {
    console.log('if');
    res.send(res.locals.teas);
  } else {
    console.log('else');
    res.send('Welcome to Spill the Tea');
  }
});

// CONTROLLERS

//CREATE A TEA
app.post('/api/teas', TeaController.createTea);


//DELETE A TEA
app.delete('/api/teas/:id', TeaController.deleteTea);

app.patch('/api/teas/:id', TeaController.updateTea);

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});
