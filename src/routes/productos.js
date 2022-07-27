const express = require("express");
const router = express.Router();
const Producto = require("../class/Producto.js");

/* /api/productos */
router
  .route("/")
  // Obtener todos los productos
  .get((req, res) => {
    const productos = Producto.getProducts();
    if (productos.length === 0) {
      res.json({ error: "No se encontraron productos." });
    } else {
      res.status(200).json(productos);
    }
  })
  // Crear un producto
  .post((req, res) => {
    let newProducto = req.body;
    if (
      Object.entries(newProducto).length === 0 ||
      Object.entries(newProducto).length < 3
    ) {
      res.status(422).json({
        error: "No se pudo obtener los atributos del producto correctamente.",
      });
    } else {
      const ids = Producto.getProducts().map((item) => item.id);
      if (ids.length === 0) {
        newProducto.id = 1;
      } else {
        let maxId = Math.max(...ids);
        newProducto.id = maxId + 1;
      }
      const producto = Producto.createProduct(newProducto);
      res.status(201).json({ productoAgregado: producto });
    }
  });

/* /api/productos/:id */
router
  .route("/:id")
  // Obtener un producto
  .get((req, res) => {
    const { id } = req.params;
    const productos = Producto.getProducts();
    const producto = Producto.getProduct(id);
    if (productos.length === 0) {
      res.json({ error: "No se encontraron productos." });
    } else {
      if (productos.length >= id) {
        producto
          ? res.json(producto)
          : res.json({ error: "Producto no encontrado." });
      } else {
        res.json({ error: "Producto no encontrado" });
      }
    }
  })
  // Editar producto
  .put((req, res) => {
    const { id } = req.params;
    let productos = Producto.getProducts();
    if (productos.length === 0) {
      res.json({ error: "No se encontraron productos." });
    } else {
      if (productos.length >= id) {
        const index = productos.findIndex((producto) => producto.id == id);
        productos = Producto.deleteProduct(id);
        let producto = req.body;
        producto.id = parseInt(id);
        productos.splice(index, 0, producto);
        res.json({ productoActualizado: producto });
      } else {
        res.json({ error: "Producto no encontrado" });
      }
    }
  })
  // Eliminar producto
  .delete((req, res) => {
    const { id } = req.params;
    let productos = Producto.getProducts();
    if (productos.length === 0) {
      res.json({ error: "No se encontraron productos." });
    } else {
      if (productos.length >= id) {
        productos = Producto.deleteProduct(id);
        res.status(200).json({ productosRestantes: productos });
      } else {
        res.json({
          error: "Producto no encontrado",
          productosRestantes: productos,
        });
      }
    }
  });

module.exports = router;
