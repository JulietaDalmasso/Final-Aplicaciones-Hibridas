import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchProyectos } from '../services/proyectos.service'
import { useToken } from '../contexts/session.context'
import './Proyectos.css'

function extraerTecnologias(proyecto) {
  if (Array.isArray(proyecto.tecnologias)) {
    return proyecto.tecnologias.map(t => String(t).trim()).filter(Boolean)
  }
  if (proyecto.tecnologias) {
    return String(proyecto.tecnologias)
      .split(',')
      .map(t => t.trim())
      .filter(Boolean)
  }
  if (proyecto.tecnologia) {
    return String(proyecto.tecnologia)
      .split(',')
      .map(t => t.trim())
      .filter(Boolean)
  }
  return []
}

const Proyectos = () => {
  const [proyectos, setProyectos] = useState([])
  const [tecnologiasDisponibles, setTecnologiasDisponibles] = useState([])
  const [tecnologiasSeleccionadas, setTecnologiasSeleccionadas] = useState([])
  const [filtroTitulo, setFiltroTitulo] = useState('')
  const token = useToken()

  useEffect(() => {
    async function cargar() {
      try {
        const data = await fetchProyectos(token)
        if (!Array.isArray(data)) return setProyectos([])

        setProyectos(data)

        const allTechs = new Set()
        data.forEach(p => {
          extraerTecnologias(p).forEach(t => allTechs.add(t))
        })

        setTecnologiasDisponibles([...allTechs])
      } catch (e) {
        setProyectos([])
      }
    }
    cargar()
  }, [token])

  const toggleTecnologia = (tec) => {
    setTecnologiasSeleccionadas(prev =>
      prev.includes(tec)
        ? prev.filter(t => t !== tec)
        : [...prev, tec]
    )
  }

  const limpiarFiltros = () => {
    setFiltroTitulo('')
    setTecnologiasSeleccionadas([])
  }

  const proyectosFiltrados = proyectos.filter(p => {
    const tecs = extraerTecnologias(p).map(t => t.toLowerCase())
    const titulo = (p.title || p.nombre || '').toLowerCase()

    if (filtroTitulo && titulo !== filtroTitulo.toLowerCase()) return false
    if (tecnologiasSeleccionadas.length > 0) {
      const seleccionadas = tecnologiasSeleccionadas.map(t => t.toLowerCase())
      const coincide = tecs.some(t => seleccionadas.includes(t))
      if (!coincide) return false
    }
    return true
  })

  const titulosDisponibles = Array.from(
    new Set(
      proyectos.map(p => p.title || p.nombre).filter(Boolean)
    )
  )

  return (
    <main className="proyectos-main">
      <div className="proyectos-container">

        <header className="proyectos-header">
          <h1>Proyectos</h1>
        </header>

        {/* FILTROS */}
        <section className="filtros-container">

          {/* FILTRO POR TÍTULO */}
          <div className="filtro-titulo">
            <label>Proyecto:</label>
            <select
              value={filtroTitulo}
              onChange={(e) => setFiltroTitulo(e.target.value)}
            >
              <option value="">Todos</option>
              {titulosDisponibles.map(t => (
                <option key={t} value={t.toLowerCase()}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* FILTRO POR TECNOLOGÍAS */}
          <div className="filtro-tecnologias">
            <span>Tecnologías:</span>

            <div className="chips-container">
              {tecnologiasDisponibles.map(tec => {
                const activa = tecnologiasSeleccionadas.includes(tec)
                return (
                  <span
                    key={tec}
                    className={`chip ${activa ? 'chip-activa' : ''}`}
                    onClick={() => toggleTecnologia(tec)}
                  >
                    {tec}
                  </span>
                )
              })}
            </div>
          </div>

          <button className="btn-limpiar" onClick={limpiarFiltros}>
            Limpiar filtros
          </button>
        </section>

        {/* NUEVO PROYECTO */}
        <div className="nuevo-proyecto-btn">
          <Link to="/proyectos/nuevo" className="btn-nuevo">+ Nuevo Proyecto</Link>
        </div>

        {/* LISTADO */}
        <div className="grid">
          {proyectosFiltrados.length > 0 ? (
            proyectosFiltrados.map(proyecto => (
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
            <p className="no-resultados">No hay proyectos para mostrar.</p>
          )}
        </div>
      </div>
    </main>
  )
}

export default Proyectos
