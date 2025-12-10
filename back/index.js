import express from "express"
import ProductosRouter from "./routes/productos.route.js"
import ProductoApiRouter from "./api/routes/productos.api.routes.js"
import UsuariosApiRouter from "./api/routes/usuarios.routes.js"
import ProyectosApiRouter from "./api/routes/proyectos.api.routes.js"
import cors from 'cors'

const app = express()

app.use(cors())

app.use("/",express.static("public"))
app.use(express.json())                         // para poder recibir datos en formato json
app.use(express.urlencoded({ extended: true })) // para poder recibir datos en formato urlencoded

//uso rutas
app.use("/productos", ProductosRouter)
app.use("/api/productos", ProductoApiRouter)
app.use("/api/usuarios", UsuariosApiRouter)
app.use("/api/proyectos", ProyectosApiRouter)

app.listen(3333, () => {
    console.log("Servidor escuchando en el puerto 3333")
})