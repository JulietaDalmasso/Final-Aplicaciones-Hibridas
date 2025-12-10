import * as service from "../../../front/src/services/productos.services.js"

export function getProductos(req, res){
    const filtros = req.query
    service.getProductos(filtros)
        .then( productos => productos.length > 0 
                        ? res.status(200).json(productos)
                        : res.status(500).json({})
                    )
}

export function getProductoById(req, res){
    const id = req.params.id
    service.getProductosById(id)
        .then( producto => res.status(200).json(producto) )
}

export function nuevoProducto(req, res){
    const producto = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        tecnologias: req.body.tecnologias
    }
    service.guardarProducto(producto)
    .then((productoNuevo) => res.status(201).json(productoNuevo))
    .catch((err) => res.status(500).json({message: "No se guardó el producto"}))
}

export function eliminarProducto(req, res){
    const id = req.params.id
    service.eliminarProducto(id)
    .then((id) => res.status(202).json({message:`Producto eliminado correctamente con id: ${id}`}))
    .catch((err) => res.status(500).json({message:`El producto no se pudo eliminar`}))
}

export function editarProducto(req, res){
    const id = req.params.id
    const producto = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        tecnologias: req.body.tecnologias
    }
    service.editarProducto(id, producto)
    .then((productoNuevo) => res.status(201).json(productoNuevo))
    .catch((err) => res.status(500).json({message: "No se guardó el producto"}))
}

export function reemplazarProducto(req, res){
    const id = req.params.id
    const producto = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        tecnologias: req.body.tecnologias
    }
    service.reemplazarProducto(id, producto)
    .then((productoNuevo) => res.status(201).json(productoNuevo))
    .catch((err) => res.status(500).json({message: "No se guardó el producto"}))
}