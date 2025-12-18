import * as service from '../../services/proyectos.service.js'

export async function getProyectos(req, res) {
    try {
      const { title, tecnologia } = req.query
  
      // vamos a armar condiciones flexibles
      const condiciones = []
  
      // Filtro por título: busca en title O en nombre
      if (title) {
        const regexTitulo = { $regex: title, $options: 'i' }
        condiciones.push({
          $or: [
            { title: regexTitulo },
            { nombre: regexTitulo }
          ]
        })
      }
  
      // Filtro por tecnología: busca en tecnologias O tecnologia
      if (tecnologia) {
        const regexTec = { $regex: tecnologia, $options: 'i' }
        condiciones.push({
          $or: [
            { tecnologias: regexTec },
            { tecnologia: regexTec }
          ]
        })
      }
  
      // si no hay condiciones, filtros = {}
      // si hay 1 o más, usamos $and
      const filtros = condiciones.length > 0 ? { $and: condiciones } : {}
  
      let proyectos
      if (req.usuario && req.usuario._id) {
        proyectos = await service.getProyectosByUsuario(req.usuario._id, filtros)
      } else {
        proyectos = await service.getTodosProyectos(filtros)
      }
  
      return res.status(200).json(proyectos)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }
  

// OBTENER UN PROYECTO POR ID
export async function getProyecto(req, res) {
  try {
    const id = req.params.id
    const proyecto = await service.getProyectoById(id)
    if (!proyecto) return res.status(404).json({ message: 'Proyecto no encontrado' })
    return res.status(200).json(proyecto)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

// CREAR NUEVO PROYECTO
export async function nuevoProyecto(req, res){
  try{
    const usuarioId = req.usuario._id

    const {
      clienteNombre,
      clienteEmail,
      clienteFoto,
      clienteDescripcion,
      ...resto
    } = req.body

    const proyecto = { 
      ...resto,
      owner: usuarioId,
      cliente: {
        nombre: clienteNombre,
        email: clienteEmail,
        foto: clienteFoto,
        descripcion: clienteDescripcion
      }
    }

    const id = await service.crearProyecto(proyecto)
    return res.status(201).json({ _id: id, ...proyecto })
  } catch (error){
    return res.status(400).json({ message: error.message })
  }
}


// BORRAR PROYECTO
export async function borrarProyecto(req, res) {
  try {
    const usuarioId = req.usuario._id
    const id = req.params.id
    await service.eliminarProyecto(id, usuarioId)
    return res.status(202).json({ message: 'Proyecto eliminado' })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

// ACTUALIZAR PROYECTO
export async function actualizarProyecto(req, res){
  try{
    const usuarioId = req.usuario._id
    const id = req.params.id

    const {
      clienteNombre,
      clienteEmail,
      clienteFoto,
      clienteDescripcion,
      ...resto
    } = req.body

    const data = {
      ...resto,
      cliente: {
        nombre: clienteNombre,
        email: clienteEmail,
        foto: clienteFoto,
        descripcion: clienteDescripcion
      }
    }

    await service.editarProyecto(id, data, usuarioId)
    return res.status(200).json({ message: 'Proyecto actualizado' })
  } catch (error){
    return res.status(400).json({ message: error.message })
  }
}

//invitar a colaborar en proyecto

export async function invitarColaborador(req, res) {
  try {
    const usuarioId = req.usuario._id
    const id = req.params.id
    const { email } = req.body

    if (!email) return res.status(400).json({ message: 'Email requerido' })

    await service.agregarColaborador(id, usuarioId, email)
    return res.status(200).json({ message: 'Colaborador invitado' })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

export async function eliminarColaborador(req, res) {
  try {
    const usuarioId = req.usuario._id
    const id = req.params.id
    const email = req.params.email

    if (!email) return res.status(400).json({ message: 'Email requerido' })

    await service.quitarColaborador(id, usuarioId, email)
    return res.status(200).json({ message: 'Colaborador eliminado' })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}