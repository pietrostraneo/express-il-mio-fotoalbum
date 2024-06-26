const express = require('express');
const app = express();

const port = process.env.PORT || 3000
const path = require('path');
const cors = require('cors');





app.use(cors({
    origin: '*',
}))

app.listen(port, () => {
    console.log(`Server is running http://localhost:${port}`);
})