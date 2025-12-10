import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useToken } from '../contexts/session.context'

const EliminarProyecto = () => {
  const { id } = useParams()
  const [proyecto, setProyecto] = useState(null)
  const [error, setError] = useState(null)
  const token = useToken()
  const navigate = useNavigate()

  useEffect(() => {
    async function cargarProyecto() {
      if (!token) return
      try {
        const res = await fetch(`http://localhost:3333/api/proyectos/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        const data = await res.json()
        setProyecto(data)
      } catch (e) {
        setError('No se pudo cargar el proyecto')
      }
    }
    cargarProyecto()
  }, [id, token])

  const handleEliminar = async e => {
    e.preventDefault()
    setError(null)
    try {
      const res = await fetch(`http://localhost:3333/api/proyectos/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await res.json()
      if (data.message === 'Proyecto eliminado') {
        navigate('/proyectos')
      } else {
        setError(data.message || 'Error al eliminar el proyecto')
      }
    } catch (err) {
      setError('Error al eliminar el proyecto')
    }
  }

  if (!token) {
    return <div style={{ color: 'red', textAlign: 'center', marginTop: '2rem' }}>Debes iniciar sesión para eliminar un proyecto.</div>
  }
  if (!proyecto) return <div className="delete">No se encontró el proyecto.</div>

  return (
    <div className="delete">
      <h1>¿Eliminar este proyecto?</h1>
      <div><strong>Nombre:</strong> {proyecto.nombre || proyecto.title}</div>
      <div><strong>Descripción:</strong> {proyecto.descripcion || proyecto.description}</div>
      <div><strong>Tecnologías:</strong> {proyecto.tecnologias}</div>
      <form onSubmit={handleEliminar}>
        <input type='submit' value='Eliminar' />
      </form>
      <button onClick={() => navigate('/proyectos')}>Volver</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  )
}

export default EliminarProyecto
