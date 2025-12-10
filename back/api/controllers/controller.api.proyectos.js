import * as service from '../../services/proyectos.service.js'

export async function getProyectos(req, res){
    try{
        let proyectos
        if (req.usuario && req.usuario._id) {
            proyectos = await service.getProyectosByUsuario(req.usuario._id)
        } else {
            proyectos = await service.getTodosProyectos()
        }
        return res.status(200).json(proyectos)
    } catch (error){
        return res.status(500).json({ message: error.message })
    }
}

export async function getProyecto(req, res){
    try{
        const id = req.params.id
        const proyecto = await service.getProyectoById(id)
    if(!proyecto) return res.status(404).json({ message: 'Proyecto no encontrado' })
    return res.status(200).json(proyecto)
    } catch (error){
        return res.status(500).json({ message: error.message })
    }
}

export async function nuevoProyecto(req, res){
    try{
        const usuarioId = req.usuario._id
        const proyecto = { ...req.body, owner: usuarioId }
        const id = await service.crearProyecto(proyecto)
        return res.status(201).json({ _id: id, ...proyecto })
    } catch (error){
        return res.status(400).json({ message: error.message })
    }
}

export async function borrarProyecto(req, res){
    try{
        const usuarioId = req.usuario._id
        const id = req.params.id
        await service.eliminarProyecto(id, usuarioId)
        return res.status(202).json({ message: 'Proyecto eliminado' })
    } catch (error){
        return res.status(400).json({ message: error.message })
    }
}

export async function actualizarProyecto(req, res){
    try{
        const usuarioId = req.usuario._id
        const id = req.params.id
        await service.editarProyecto(id, req.body, usuarioId)
        return res.status(200).json({ message: 'Proyecto actualizado' })
    } catch (error){
        return res.status(400).json({ message: error.message })
    }
}
