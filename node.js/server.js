require('dotenv').config();
const express = require('express');
const mongoose = require('./config/db');
const authRoutes = require('./routes/auth');
const exam = require("./routes/exam");

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use("/api/exam", exam);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
