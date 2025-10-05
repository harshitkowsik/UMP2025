require('dotenv').config({ override: true });

const express = require('express');
const path = require('path');
const connectDB = require('./config');
const mongoose = require('mongoose');
const cors = require('cors');
const winston = require('winston');

const app = express();

// Configure Winston logger with Console and File transports
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'govt-document-api' },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
    }),
    new winston.transports.File({ filename: path.join(__dirname, '../logs/app.log') }),
  ],
});

app.use(cors());

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running. Welcome to the Govt Document API.');
});

// Connect to DB then initialize routes & server
connectDB()
  .then(() => {
    const userRoutes = require('./routes/user');
    const authRoutes = require('./routes/auth');
    const feedbackRoutes = require('./routes/feedback');
    const documentRoutes = require('./routes/document');

    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
    app.use('/api/auth', authRoutes);
    app.use('/api/documents', documentRoutes);
    app.use('/api/feedback', feedbackRoutes);
    app.use('/api/user', userRoutes);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      logger.info(`Server started on port ${PORT}`);
      console.log(`Server hosted at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    logger.error('Failed to start server:', err);
    console.error('Failed to start server:', err);
    process.exit(1);
  });

process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception:', err);
  console.error('Uncaught Exception:', err.stack || err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  console.error('Unhandled Rejection at:', promise, 'reason:', reason.stack || reason);
  process.exit(1);
});
