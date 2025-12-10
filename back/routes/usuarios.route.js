import { Router } from 'express';
import * as controller from '../controllers/controller.api.usuarios.js';
import { validateUser } from '../../moddleware/usuarios.validate.middleware.js';

const router = Router ();

route.post("/", [validateUser], controller.createUser)
route.post("/login" , controller.login)


export default route;
