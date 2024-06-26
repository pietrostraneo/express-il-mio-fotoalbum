const express = require('express');
const app = express();
require('dotenv').config();

const port = process.env.PORT || 3000;
const path = require('path');
const cors = require('cors');

// Importing Routers
const photoRouter = require('./routers/photo.js');
const categoryRouter = require('./routers/category.js');
const messageRouter = require('./routers/message.js');

app.use(cors({
    origin: '*', // Everyone is allowed to access endpoints
}));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ENDPOINTS

app.use('/api/photos', photoRouter); // Photos Endpoint
app.use('/api/categories', categoryRouter); // Category Endpoint
app.use('/api/contact', messageRouter); // Contacts Endpoint

app.listen(port, () => {
    console.log(`Server is running http://localhost:${port}`);
})