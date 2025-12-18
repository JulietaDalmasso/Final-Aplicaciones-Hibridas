import { Router } from 'express'
import * as controllers from '../controllers/controller.api.proyectos.js'
import { validateToken } from '../../middleware/token.validate.middleware.js'
import { validateProyecto } from '../../middleware/proyecto.validate.middleware.js'

const route = Router()

route.get('/', controllers.getProyectos)
route.post('/', validateToken, validateProyecto, controllers.nuevoProyecto)
route.get('/:id', controllers.getProyecto)
route.put('/:id', validateToken, validateProyecto, controllers.actualizarProyecto)
route.delete('/:id', validateToken, controllers.borrarProyecto)

//ruta para invitar a colaborador
route.post('/:id/invitar', validateToken, controllers.invitarColaborador)
route.delete('/:id/colaboradores/:email', validateToken, controllers.eliminarColaborador)

export default route
