const express = require('express');
const productRouter = require('./routes/productRouter');
const app = express();
const PORT = process.env.PORT || 8080;
const Producto = require('./class/Producto')
const product = new Producto;

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use('/api/productos', productRouter);

// Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

product.getAll();