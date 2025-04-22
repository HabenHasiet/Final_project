const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const fs = require('fs');
const path = require('path');
const sequelize = require('./config/dbConfig'); // Corrected path for dbConfig

// Load environment variables
dotenv.config();

const app = express();

// Ensure the uploads folder exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Middleware
app.use(express.json()); // Parse JSON requests

// Serve static files from the uploads folder
app.use('/uploads', express.static(uploadsDir));

// Routes
app.use('/api/users', userRoutes);

// Test database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

// Sync database
sequelize
  .sync()
  .then(() => {
    console.log('Database synced successfully.');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});