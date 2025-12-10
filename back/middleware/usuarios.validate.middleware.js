import { usuatioScehema } from "../schemas/usuarios.schema.js";

export async function validateUsuario (req, res, next ) {
    try {
        const datoValidado = await usuarioSchema.validate (req.body,
        { abortEarly: false, stripUnknown: true})
        req.body = datoValidado
        next ()
    } catch (error) {
        res.status(400).json ({message: error.errors})

    }
}