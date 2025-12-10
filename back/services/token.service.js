import jwt from "jsonwebtoken";
import {MongoClient, ObjectId} from "mongodb"

const SECRET_KEY = process.env.SECRET_KEY || "123456789"

const client = new MongoClient("mongodb+srv://admin:admin@dwn4ap.jj397vb.mongodb.net");
const db = client.db("AH2023CP1");
const tokens = db.collection ("tokens")

export async function createToken (usuario){
    await client.connect()

    const token = jwt.sign ({ ...usuario, password: undefined},
        SECRET_KEY,
        {expiresIn: '2h'}
    )

    // Guardar/actualizar sesión (upsert)
    await tokens.updateOne(
        { usuarioId: usuario._id },
        { $set: { usuarioId: usuario._id, token } },
        { upsert: true }
    )

    return token
}

export async function validateToken (token){
    await client.connect()
    try{
        const payload = jwt.verify (token, SECRET_KEY)

        const sessionActive = await tokens.findOne ({ token: token, usuarioId: new ObjectId(payload._id) })
        if (!sessionActive) throw new Error ("Token invalido")

        // jwt.verify ya valida la expiración; si llegó aquí, devolvemos el payload
        return payload
    } catch (error){
        // devolvemos null para indicar token inválido al caller, o lanzamos el error según el uso
        throw new Error (error.message || "Token invalido")
    }
}