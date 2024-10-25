const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user.routes');
const bankRoutes = require('./routes/bank.routes');
const adminRoutes = require('./routes/admin.Routes')

const cors = require('cors');

const app = express();


app.use(cors());
// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());



// Routes
app.use('/api/user', userRoutes);
app.use('/api/banks', bankRoutes);
app.use('/api/admin', adminRoutes);



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
