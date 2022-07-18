const express = require('express');
const router = express.Router();

let productos = [];

/* /api/productos */
router.route('/')
    // Obtener todos los productos
    .get((req, res) => {
        if (productos.length === 0){
            res.status(204).json({ error: 'No se encontraron productos.'});
        }else{
            res.status(200).json(productos);
        }
    })
    // Crear un producto
    .post((req, res) => {
        let producto = req.body;
        if (Object.entries(producto).length === 0 || Object.entries(producto).length < 3){
            res.status(422).json({ error: 'No se pudo obtener los atributos del producto correctamente.'});
        }else{
            const ids = productos.map(item => item.id);
            if(ids.length === 0){
                producto.id = 1;
            }else{
                let maxId = Math.max(...ids);
                producto.id = maxId + 1;
            }
            productos.push(producto);
            res.status(201).json({ productoAgregado: producto });
        }
    })


/* /api/productos/:id */
router.route('/:id')
    // Obtener un producto
    .get((req, res) => {
        const { id } = req.params;
        const producto = productos.find(product => product.id == id);
        producto ? res.json(producto) : res.status(404).json({ error: 'Producto no encontrado.' });
    })
    // Editar producto
    .put((req, res) => {
        const { id } = req.params;
        if (productos.length === 0){
            res.status(204).json({ error: 'No se encontraron productos.'});
        }else{
            if (productos.length >= id){
                const index = productos.findIndex(producto => producto.id == id);
                productos = productos.filter(producto => producto.id != id);
                let newProduct = req.body;
                newProduct.id = parseInt(id);
                productos.splice(index, 1, newProduct);
                res.json({ productoActualizado: newProduct });
            }else{
                res.status(404).json({ error: 'Producto no encontrado' });
            }
        }
    })
    // Eliminar producto
    .delete((req, res) => {
        const { id } = req.params;
        if (productos.length === 0){
            res.status(204).json({ error: 'No se encontraron productos.'});
        }else{
            if (productos.length >= id){
                productos = productos.filter(producto => producto.id != id);
                res.status(200).json({ productosRestantes: productos });
            }else{
                res.status(404).json({ error: 'Producto no encontrado', productosRestantes: productos });
            }
        }
    })

module.exports = router;