import { productoSchema } from "../schemas/producto.js";

export function validateProducto(req, res, next){
    console.log('Validando...');
    productoSchema.validate(req.body,

        {
            abortEarly: false, 
            stripUnknown: true
        })
        .then( () => next() )
        .catch( (error) => res.status(400).json({ message: error.message, errors: error.errors || [] }))
}