import express from "express"
import * as controller from "../controller/productos.controller.js"
import { validateProducto } from "../middleware/producto.validate.middleware.js"

const router = express.Router()

//traigo productos
router.get("/", controller.getProductos)

// filtrar por sección
router.get("/seccion/:seccion", controller.filtrarProductos)

//Ruta a nuevo proyecto
router.get("/nuevo", controller.formularioNuevoProducto)
router.post("/nuevo",[validateProducto], controller.guardarProducto)

//Ruta de los productos con el ID correspondiente
router.get("/:id", controller.getProductosById)

//rutas para modificar un producto
router.get("/modificar/:id", controller.formularioModificarProducto)
router.post("/modificar/:id", controller.editarProducto)

//rutas para eliminar un producto
router.get("/eliminar/:id", controller.formularioEliminar)
router.post("/eliminar/:id", controller.eliminarProducto)

export default router
