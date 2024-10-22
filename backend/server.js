const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const leaveRoutes = require('./routes/leaveRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Routes for api's
app.use('/api', userRoutes);
app.use('/api', leaveRoutes);

// Connect to db
mongoose.connect('mongodb://localhost:27017/leaveManagement').then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
