const express = require('express');

const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', );

// Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})