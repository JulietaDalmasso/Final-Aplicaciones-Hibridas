import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { fetchProyectos } from '../services/proyectos.service'
import { useToken } from '../contexts/session.context'

const Proyectos = () => {
  const [proyectos, setProyectos] = useState([])
  const token = useToken()
  const location = useLocation()

  useEffect(() => {
    async function cargarProyectos() {
      try {
        const data = await fetchProyectos(token)
        if (Array.isArray(data)) {
          setProyectos(data)
        } else {
          setProyectos([])
        }
      } catch (e) {
        setProyectos([])
      }
    }
    cargarProyectos()
  }, [token, location.pathname])

  return (
    <main>
      <header className="proyectos-header">
        <h1>Proyectos</h1>
      </header>
      <div className="nuevo-proyecto-btn">
        <Link to="/proyectos/nuevo" className="btn-nuevo">+ Nuevo Proyecto</Link>
      </div>
      <div className="grid">
        {Array.isArray(proyectos) && proyectos.length > 0 ? (
          proyectos.map(proyecto => (
            <article className="card" key={proyecto._id}>
              <img src={proyecto.img || '/imgs/porfolio.png'} alt="portfolio" />
              <h3>{proyecto.title || proyecto.nombre}</h3>
              <p>{proyecto.description || proyecto.descripcion}</p>
              <div className="actions">
                <Link to={`/proyectos/${proyecto._id}`}>Ver</Link> |
                <Link to={`/proyectos/modificar/${proyecto._id}`}>Editar</Link> |
                <Link to={`/proyectos/eliminar/${proyecto._id}`}>Eliminar</Link>
              </div>
            </article>
          ))
        ) : (
          <p style={{ color: '#aaa', textAlign: 'center', gridColumn: '1/-1' }}>No hay proyectos para mostrar.</p>
        )}
      </div>
      <footer>
        <p>&copy; Parcial Aplicaciones Hibridas - 2025</p>
      </footer>
    </main>
  )
}

export default Proyectos
