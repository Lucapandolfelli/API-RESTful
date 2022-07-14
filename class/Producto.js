let id = 1;

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
            const productos = this.getAll();
            const ids = productos.map(producto => producto.id);
            const maxId = Math.max(...ids);
            /* const data = await this.getAll();
            if (!data){
                producto.id = id;
                arrayObj.push(producto);
                await fs.promises.writeFile(this.archive, JSON.stringify(arrayObj, null, 2));
                console.log('Producto cargado correctamente.');
            }else{
                if (data.length === 0){
                    producto.id = id;
                }else{
                    let lastItem = data[data.length - 1];
                    if (lastItem.id >= 1){
                        producto.id = lastItem.id + 1;
                    }else{
                        producto.id = id;
                    }
                }
                data.push(producto);
                await fs.promises.writeFile(this.archive, JSON.stringify(data, null, 2));
                console.log('Producto cargado correctamente.');
            } */
        } catch(err){
            console.log(err);
        }
    }

    async getById(id){
        try{
            const data = JSON.parse(await fs.promises.readFile(this.archive, 'utf-8'));
            const objId = data.find(obj => obj.id === id);
            /* objId ? console.log(objId) : console.log(null); */
            return objId;
        } catch(err){
            return false;
        }
    }

    async getAll(){
        try{
            const data = await this.fetchData('http://localhost:8080/api/productos', {method: 'GET'});
            console.log(data);
        } catch(err){
            return false;
        }
    }

    async deleteById(id){
        try{
            const obj = await this.getById(id);
            const data = await this.getAll();
            const newArray = data.filter(item => item.id != obj.id);
            await fs.promises.writeFile(this.archive, JSON.stringify(newArray, null, 2));
            console.log('Producto eliminado correctamente.');
        } catch(err){
            console.log('El producto indicado ya se ha eliminado.');
        }
    }

    async deleteAll(){
        try{
            const data = await this.getAll();
            data.splice(0, data.length);
            await fs.promises.writeFile(this.archive, JSON.stringify(data, null, 2));
            console.log('Productos borrados corectamente.');
        } catch(err){
            console.log(err);
        }
    }
}

module.exports = Producto;