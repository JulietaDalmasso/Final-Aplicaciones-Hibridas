import { proyectoSchema } from '../schemas/proyecto.js'

export function validateProyecto(req, res, next){
    proyectoSchema.validate(req.body, { abortEarly: false, stripUnknown: true })
        .then(() => next())
        .catch(error => res.status(400).json({ message: error.message, errors: error.errors || [] }))
}
