import { readFile, writeFile  } from "node:fs/promises"
import { MongoClient, ObjectId } from "mongodb";



const client = new MongoClient("mongodb+srv://admin:admin@dwn4ap.jj397vb.mongodb.net")
const db = client.db("AH2023CP1")

//funcion para leer los productos del json
// export async function getProductos(filter = {}) {
//     await client.connect();
//     return db.collection("Projects").find(filter).toArray();
// }
export async function getProductos(filter = {}) {
    const filterMongo = {};
  
    
    if (filter.nombre != undefined) {
      filterMongo.nombre = { $eq: filter.nombre };
    }
  
    
    if (filter.seccion != undefined) {
      filterMongo.seccion = { $eq: filter.seccion };
    }
  
    await client.connect();
    return db.collection("Projects").find(filterMongo).toArray();
  }
  
//funcion para traer los productos por id
export async function getProductosById(_id){
    await client.connect()
    return db.collection("Projects").findOne({_id: new ObjectId(_id)})
}

export async function guardarProducto(producto){
  await client.connect()
  const result = await db.collection("Projects").insertOne(producto)
  return result.insertedId  // 👈 devolvemos el id real de Mongo
}


export async function reemplazarProducto(_id, producto){
    await client.connect()
    return db.collection("Projects").replaceOne({_id: new ObjectId(_id)}, producto)
}

//eliminar prod
// export function eliminarProducto(_id){
//     return db.collection("Projects").deleteOne({_id: new ObjectId(_id)})
// }

// export async function eliminarProducto(id){
//     if (!ObjectId.isValid(id)) return null;
//     const objectId = new ObjectId(id);
//     const result = await collection.updateOne(
//       { _id: objectId },
//       { $set: { eliminado: true } }
//     );
//     return result.modifiedCount === 1 ? id : null;
//   }

// export function editarProducto(_id, producto){
//     return db.collection("Projects").updateOne({_id: new ObjectId(_id)}, {$set: producto})
// }

export async function editarProducto(_id, producto) {
    if (!ObjectId.isValid(_id)) {
        throw new Error("ID inválido");
    }

    const objectId = new ObjectId(_id);

    try {
        await client.connect();
        const result = await db.collection("Projects").updateOne(
            { _id: objectId },
            { $set: producto }
        );

        if (result.matchedCount === 0) {
            throw new Error("Producto no encontrado");
        }

        return producto; // Devuelve el producto actualizado
    } catch (error) {
        console.error("Error al editar el producto:", error);
        throw error; // Lanza el error para que el controlador lo maneje
    } finally {
        await client.close();
    }
}

export async function eliminarProducto(id) {
    if (!ObjectId.isValid(id)) {
      throw new Error("ID inválido");
    }
  
    const objectId = new ObjectId(id);
  
    try {
      await client.connect();
      const result = await db.collection("Projects").deleteOne({ _id: objectId });
  
      if (result.deletedCount === 0) {
        throw new Error("Producto no encontrado");
      }
  
      return id; // Devuelve el ID del producto eliminado
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      throw error; // Lanza el error para que el controlador lo maneje
    } finally {
      await client.close();
    }
  }