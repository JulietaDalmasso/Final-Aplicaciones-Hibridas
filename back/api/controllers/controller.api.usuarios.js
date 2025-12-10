import * as service from "../../services/usuarios.service.js"
import { usuarioSchema, loginSchema } from "../../schemas/usuarios.js"

export async function createUser(req, res){
    try {
        const validated = await usuarioSchema.validate(req.body, { abortEarly: false })
        const usuario = await service.createUser(validated)
        return res.status(201).json(usuario)
    } catch (error) {
        return res.status(400).json({ message: error.message, errors: error.errors || [] })
    }
}

export async function login(req,res){
    try {
        const validated = await loginSchema.validate(req.body, { abortEarly: false })
        const usuario = await service.login(validated)
        return res.status(200).json(usuario)
    } catch (error) {
        console.log("❌ ERROR LOGIN:", error);
        return res.status(400).json({ message: error.message, errors: error.errors || [] })
    }
}
        