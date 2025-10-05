const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/applications', require('./routes/applicationRoutes'));
app.use('/api/feedback', require('./routes/feedbackRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/user', require('./routes/userRoutes'));

app.get('/', (req, res) => {
    res.send('Digital E Gram Panchayat API running');
  });  

const PORT = process.env.PORT || 5000;
const hostname = 'localhost';

app.listen(PORT, () => console.log(`Server running at http://${hostname}:${PORT}`));
