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
const authRouter = require('./routers/auth.js')

// Importing Middlewares
const errorHandler = require('./middlewares/errorHandler.js');
const notFound = require('./middlewares/notFound.js');

app.use(cors({
    origin: '*', // Everyone is allowed to access endpoints
}));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ENDPOINTS

app.use('/auth', authRouter); // Auth Endpoint
app.use('/api/photos', photoRouter); // Photos Endpoint
app.use('/api/categories', categoryRouter); // Category Endpoint
app.use('/api/contact', messageRouter); // Contacts Endpoint

// Middlewares
app.use(errorHandler);
app.use(notFound);

// Server
app.listen(port, () => {
    console.log(`Server is running http://localhost:${port}`);
})