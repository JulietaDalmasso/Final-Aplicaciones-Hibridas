import { createPage } from "../pages/utils.js"
import * as services from "../../front/src/services/productos.services.js"
import * as views from "../views/productos.view.js"



export function getProductos(req, res){
    services.getProductos({eliminados: true})
        .then( (productos) => res.send(views.crearListadoProductos(productos)) )
}



export function getProductosById(req, res){
    const id = req.params.id
    services.getProductosById(id)
        .then(producto => res.send(views.crearDetalleProducto(producto)) )
} 

export function formularioNuevoProducto(req, res){
    res.send(views.formularioNuevoProducto())
}

export function guardarProducto(req, res) {
    const producto = {
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      tecnologias: req.body.tecnologias,
      img: req.body.img 
    };
  
    services.guardarProducto(producto)
      .then(() => res.send(views.creacionExito(producto)));
  }




export function formularioModificarProducto(req, res){
    const id = req.params.id
    services.getProductosById(id)
        .then( producto => res.send( views.formularioModificarProducto(producto) ) )
} 

//funcion para editar

export function editarProducto(req, res) {
    const id = req.params.id;
    const producto = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        tecnologias: req.body.tecnologias
    };

    services.editarProducto(id, producto)
        .then(() => res.redirect("/productos")) 
        .catch(err => {
            console.error("Error al editar:", err);
            res.status(500).send(createPage("Error", "<p>No se pudo editar el producto.</p>"));
        });
}

//funcion para eliminar
export function formularioEliminar(req, res){
    const id = req.params.id
    services.getProductosById(id)
        .then( producto => res.send( views.formularioEliminar(producto) ) )
}

// export function eliminarProducto(req, res){
//     const id = req.params.id
//     services.eliminarProducto(id)
//     .then(id => res.send(views.eliminacionExito(id)))
    
// }


// export function eliminarProducto(req, res){
//     const id = req.params.id;
//     services.eliminarProducto(id)
//       .then(idString => res.send(views.eliminacionExito(idString)))
//       .catch(err => res.send(views.eliminacionExito(null)));
//   }

// export function eliminarProducto(req, res){
//     const id = req.params.id
//     services.eliminarProducto(id)
//     .then(id => res.send(views.eliminacionExito(id)))
    
// }

//funcion para eliminar
export function eliminarProducto(req, res) {
    const id = req.params.id;

    services.eliminarProducto(id)
        .then(() => res.redirect("/productos")) 
        .catch(err => {
            console.error("Error al eliminar:", err);
            res.status(500).send(createPage("Error", "<p>No se pudo eliminar el producto.</p>"));
        });
}



export function filtrarProductos(req, res) {
    const { seccion } = req.params; //  params en vez de query

    services.getProductos({ seccion })
        .then(productos => {
            
            const secciones = ["Branding", "Diseño Web", "Videoclips", "Diseño Gráfico", "Fotografía"]; 
            res.send(views.crearListadoProductos(productos, secciones));
        })
        .catch(err => {
            console.error("Error al filtrar los productos:", err);
            res.status(500).send(createPage("Error", "<p>Ocurrió un error al filtrar los productos.</p>"));
        });
}
