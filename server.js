// const express = require('express');
// const dotenv = require('dotenv').config(); // Corrected typo here
// const app = express();
// const port = process.env.PORT || 5000;

// app.get('/api/contacts', (req, res) => {
//   return res.status(200).json({ message: 'Get all contacts' });
// });
// app.use('/api/contacts', require('./routes/contactRoutes'));

// app.listen(port, () => {
//   console.log(`Server running on ${port}`); // Corrected template literal
// });
const express = require('express');
const dotenv = require('dotenv').config(); // Corrected typo here
const errorHandler = require('./middleware/errorHandler');
const { connect } = require('./routes/contactRoutes');
const connectDb = require('./config/dbConnection'); // Adjust the path accordingly

const app = express();
const port = process.env.PORT || 5000;

app.get('/api/contacts', (req, res) => {
  return res.status(200).json({ message: 'Get all contacts' });
});
app.use(express.json());
app.use('/api/contacts', require('./routes/contactRoutes'));
app.use(errorHandler);
connectDb();
app.listen(port, () => {
  console.log(`Server running on ${port}`); // Corrected template literal
});
