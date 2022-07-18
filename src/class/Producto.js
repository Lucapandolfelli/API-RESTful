class Producto {
    
    constructor(title, price, thumbnail){
        this.title = title,
        this.price = price,
        this.thumbnail = thumbnail
    }

    async fetchData(URL, method){
        const res = await fetch(URL, method);
        const data = await res.json();
        return data;
    }

    async save(){
        try{
            const data = await this.fetchData('http://localhost:8080/api/productos', {method: 'POST'});
            let productos = this.getAll();
            productos.concat(data);
        } catch(err){
            console.log(err);
        }
    }

    async getById(id){
        try{
            const data = await this.fetchData(`http://localhost:8080/api/productos/${id}`, {method: 'GET'});
            console.log(data);
        } catch(err){
            console.log(err);
        }
    }

    async getAll(){
        try{
            const data = await this.fetchData('http://localhost:8080/api/productos', {method: 'GET'});
            console.log(data);
        } catch(err){
            console.log(err);
        }
    }

    async deleteById(id){
        try{
            const data = await this.fetchData(`http://localhost:8080/api/productos/${id}`, {method: 'DELETE'});
            console.log(data);
        } catch(err){
            console.log('El producto indicado ya se ha eliminado.');
        }
    }
}

module.exports = Producto;