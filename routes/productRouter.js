const express = require('express');
/* const Producto = require('../class/Producto'); */
const router = express.Router();
let productos = [{
    title: 'producto',
    price: '12',
    thumbnail: 'url thumbnail',
    id: 1
}];

router.route('/')
    .get((req, res) => {
        res.json(productos);
    })
    .post((req, res) => {
        let producto = req.body;
        const ids = productos.map(item => item.id);
        if(ids.length === 0){
            producto.id = 1;
        }else{
            let maxId = Math.max(...ids);
            producto.id = maxId + 1;
        }
        productos.push(producto);
        res.status(201).json({ productoAgregado: producto });
    })

router.route('/:id')
    .get((req, res) => {
        const id = req.params.id;
        const producto = productos.find(product => product.id == id);
        producto ? res.json(producto) : res.json({ error: 'Producto no encontrado' });
    })
    .put((req, res) => {
        const id = req.params.id;
        productos.forEach((item, index) => {
            if (item.id == id){
                let producto = req.body;
                producto.id = parseInt(id);
                productos.splice(index, 1, producto);
                res.json(producto);
            }
        });
    })
    .delete((req, res) => {
        const id = req.params.id;
        productos.forEach((item) => {
            if (item.id == id){
                productos = productos.filter(producto => producto.id != id);
                res.json(productos);
            }
        });
    })

module.exports = router;