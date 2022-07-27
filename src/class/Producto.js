let products = [];

class Producto {
  getProducts() {
    return products;
  }

  getProduct(id) {
    const foundProduct = products.find((producto) => producto.id == id);
    return foundProduct;
  }

  createProduct(newProduct) {
    products.push(newProduct);
    return newProduct;
  }

  editProduct(index, newProduct) {
    products.splice(index, 1, newProduct);
    return newProduct;
  }

  deleteProduct(id) {
    products = products.filter((item) => item.id != id);
    return products;
  }
}

module.exports = new Producto();
