import { MongoClient, ObjectId } from 'mongodb'

export async function getTodosProyectos(){
    await client.connect()
    return await db.collection('Projects').find({}).toArray()
}

const client = new MongoClient("mongodb+srv://admin:admin@dwn4ap.jj397vb.mongodb.net");
const db = client.db("AH2023CP1");

export async function getProyectosByUsuario(usuarioId){
    await client.connect()
    const proyectos = await db.collection('Projects').find({ owner: new ObjectId(usuarioId) }).toArray()
    return proyectos
}

export async function getProyectoById(id){
    await client.connect()
    return await db.collection('Projects').findOne({ _id: new ObjectId(id) })
}

export async function crearProyecto(proyecto){
    await client.connect()
    const result = await db.collection('Projects').insertOne({ ...proyecto, createdAt: new Date(), updatedAt: new Date() })
    return result.insertedId
}

export async function editarProyecto(id, data, usuarioId){
    await client.connect()
    const res = await db.collection('Projects').findOne({ _id: new ObjectId(id) })
    if (!res) throw new Error('Proyecto no encontrado')
    if (String(res.owner) !== String(usuarioId)) throw new Error('No autorizado')
    await db.collection('Projects').updateOne({ _id: new ObjectId(id) }, { $set: { ...data, updatedAt: new Date() } })
    return true
}

export async function eliminarProyecto(id, usuarioId){
    await client.connect()
    const res = await db.collection('Projects').findOne({ _id: new ObjectId(id) })
    if (!res) throw new Error('Proyecto no encontrado')
    if (String(res.owner) !== String(usuarioId)) throw new Error('No autorizado')
    await db.collection('Projects').deleteOne({ _id: new ObjectId(id) })
    return true
}
