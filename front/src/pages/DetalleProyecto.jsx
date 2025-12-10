import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useToken } from '../contexts/session.context'

const DetalleProyecto = () => {
  const { id } = useParams()
  const [proyecto, setProyecto] = useState(null)
  const token = useToken()

  useEffect(() => {
    async function fetchDetalle() {
      try {
        const headers = {}
        if (token) headers['Authorization'] = `Bearer ${token}`
        const res = await fetch(`http://localhost:3333/api/proyectos/${id}`, { headers })
        const data = await res.json()
        // Si el proyecto tiene message, no existe
        if (data.message) setProyecto(null)
        else setProyecto(data)
      } catch (e) {
        setProyecto(null)
      }
    }
    fetchDetalle()
  }, [id, token])

  if (!proyecto) return <div className="detail">No se encontró el proyecto.</div>

  return (
    <div className="detail">
      <img src={proyecto.img || '/imgs/porfolio.png'} alt="imagen del proyecto" className="detail-img" />
      <h1>Nombre del proyecto: {proyecto.nombre || proyecto.title}</h1>
      <p><strong>Descripción:</strong> {proyecto.descripcion}</p>
      <p><strong>Tecnologías utilizadas:</strong> {proyecto.tecnologias}</p>
      {proyecto.link && (
        <p><a href={proyecto.link} target="_blank" rel="noopener noreferrer">Ver proyecto ↗</a></p>
      )}
      <Link to="/proyectos">Volver</Link>
    </div>
  )
}

export default DetalleProyecto
