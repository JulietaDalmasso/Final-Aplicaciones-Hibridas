import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";
import { createToken } from "./token.service.js";

const client = new MongoClient("mongodb+srv://admin:admin@dwn4ap.jj397vb.mongodb.net");
const db = client.db("AH2023CP1");


export async function createUser(usuario) {
    await client.connect();

    // Verificar si el usuario ya existe
    const existe = await db.collection("usuarios").findOne({ email: usuario.email });
    if (existe) throw new Error("El usuario ya existe");

    const nuevoUsuario = {
        username: usuario.username,
        email: usuario.email,
        age: usuario.age,
        password: await bcrypt.hash(usuario.password, 10) // encriptamos 
    };

    // Guardar en la BD
    await db.collection("usuarios").insertOne(nuevoUsuario);

    // Devolver usuario sin password
    return { username: nuevoUsuario.username, email: nuevoUsuario.email, age: nuevoUsuario.age };
}


export async function login(usuario) {
    await client.connect();

    const existe = await db.collection("usuarios").findOne({ email: usuario.email });
    if (!existe) throw new Error("Credenciales inválidas");

    //comparar contraseñas
    const esValido = await bcrypt.compare(usuario.password, existe.password);
    if (!esValido) throw new Error("Credenciales inválidas");

    const token = await createToken(existe);

    return {
        _id: existe._id,
        username: existe.username,
        email: existe.email,
        age: existe.age,
        token
    };
}
