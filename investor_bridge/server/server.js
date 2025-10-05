const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const logger = require('./utils/logger');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/proposals', require('./routes/proposalRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/feedback', require('./routes/feedbackRoutes'));
app.use('/api/queries', require('./routes/queryRoutes'));
app.use('/api/solutions', require('./routes/solutionRoutes'));
app.use('/api/loans', require('./routes/loanRoutes'));
app.use('/api/advisor-info', require('./routes/advisorInfo'));

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

app.get('/', (req, res) => {
    res.send('API is running');
  });  

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
