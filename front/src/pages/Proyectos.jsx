import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchProyectos } from '../services/proyectos.service'
import { useToken } from '../contexts/session.context'
import './Proyectos.css'

function extraerTecnologias(proyecto) {
  let raw = []

  if (Array.isArray(proyecto.tecnologias)) {
    raw = proyecto.tecnologias
  } else if (typeof proyecto.tecnologias === "string") {
    raw = proyecto.tecnologias.split(',')
  } else if (typeof proyecto.tecnologia === "string") {
    raw = proyecto.tecnologia.split(',')
  }

  return raw
    .map(t => String(t).trim())  
    .filter(t => t.length > 0)   
    .map(t => t.replace(/,+$/, '')) 
}


const Proyectos = () => {
  const [proyectos, setProyectos] = useState([])            // lista filtrada 
  const [proyectosBase, setProyectosBase] = useState([])    // todos los proyectos 
  const [tecnologiasDisponibles, setTecnologiasDisponibles] = useState([])
  const [tecnologiasSeleccionadas, setTecnologiasSeleccionadas] = useState([])
  const [filtroTitulo, setFiltroTitulo] = useState('')
  const token = useToken()

  // Cargar todos los proyectos una sola vez para construir filtros
  useEffect(() => {
    async function cargarBase() {
      try {
        const data = await fetchProyectos(token) // sin filtros
        if (!Array.isArray(data)) {
          setProyectosBase([])
          setTecnologiasDisponibles([])
          return
        }

        setProyectosBase(data)

        const allTechs = new Set()
        data.forEach(p => {
          extraerTecnologias(p).forEach(t => allTechs.add(t))
        })
        setTecnologiasDisponibles([...allTechs])
      } catch (e) {
        setProyectosBase([])
        setTecnologiasDisponibles([])
      }
    }
    if (token !== undefined) {
      cargarBase()
    }
  }, [token])

  // Cargar proyectos filtraods desde el back cada vez que cambian filtros
  useEffect(() => {
    async function cargarFiltrados() {
      try {
        const filtros = {}

        if (filtroTitulo) filtros.title = filtroTitulo
        if (tecnologiasSeleccionadas.length === 1) {
          filtros.tecnologia = tecnologiasSeleccionadas[0]
        }

        const data = await fetchProyectos(token, filtros)
        if (!Array.isArray(data)) {
          setProyectos([])
          return
        }

        setProyectos(data)
      } catch (e) {
        setProyectos([])
      }
    }
    if (token !== undefined) {
      cargarFiltrados()
    }
  }, [token, filtroTitulo, tecnologiasSeleccionadas])

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

  // ahora proyectosFiltrados es lo que vino del back
  const proyectosFiltrados = proyectos

  const titulosDisponibles = Array.from(
    new Set(
      proyectosBase.map(p => p.title || p.nombre).filter(Boolean)
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
                <option key={t} value={t}>
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
