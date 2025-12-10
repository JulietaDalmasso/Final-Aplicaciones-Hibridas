import * as tokenService from "../services/token.service.js"

// Para validar el token
export async function validateToken (req, res, next){

    try {
        const auth = req.headers.authorization
        if (!auth) return res.status(401).json({ message: "Token no encontrado" })

        const [bearer, token] = auth.split(" ");

        if (bearer !== "Bearer" || !token) return res.status(401).json({ message: "Formato del token invalido" })

        const usuario = await tokenService.validateToken(token)

        if (!usuario) return res.status(401).json({ message: "Token invalido" })

        req.usuario = usuario

        return next()
    } catch (error) {
        return res.status(401).json({ message: error.message || "Token invalido" })
    }
}