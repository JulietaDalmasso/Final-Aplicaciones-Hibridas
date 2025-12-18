import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useToken } from '../contexts/session.context'
import './DetalleProyecto.css'

const DetalleProyecto = () => {
  const { id } = useParams()
  const [proyecto, setProyecto] = useState(null)

  const [emailInvitar, setEmailInvitar] = useState('')
  const [mensaje, setMensaje] = useState(null)

  const token = useToken()

  async function fetchDetalle() {
    try {
      const headers = {}
      if (token) headers['Authorization'] = `Bearer ${token}`

      const res = await fetch(`http://localhost:3333/api/proyectos/${id}`, { headers })
      const data = await res.json()

      if (data.message) setProyecto(null)
      else setProyecto(data)
    } catch (e) {
      setProyecto(null)
    }
  }

  useEffect(() => {
    fetchDetalle()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, token])

  async function invitarColaborador() {
    setMensaje(null)

    if (!emailInvitar.trim()) {
      setMensaje('Ingresá un email para invitar.')
      return
    }

    try {
      const res = await fetch(`http://localhost:3333/api/proyectos/${id}/invitar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email: emailInvitar }),
      })

      const data = await res.json()
      setMensaje(data.message || 'Colaborador invitado')
      setEmailInvitar('')
      await fetchDetalle()
    } catch (e) {
      setMensaje('Error al invitar colaborador')
    }
  }

  async function eliminarColaborador(email) {
    setMensaje(null)

    try {
      const res = await fetch(
        `http://localhost:3333/api/proyectos/${id}/colaboradores/${encodeURIComponent(email)}`,
        {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        }
      )

      const data = await res.json()
      setMensaje(data.message || 'Colaborador eliminado')
      await fetchDetalle()
    } catch (e) {
      setMensaje('Error al eliminar colaborador')
    }
  }

  if (!proyecto) return <div className="detail">No se encontró el proyecto.</div>

  const colaboradores = Array.isArray(proyecto.colaboradores)
    ? proyecto.colaboradores
    : []

  return (
    <div className="detail">
      <div className="detail-card">
        <img
          src={proyecto.img || '/imgs/porfolio.png'}
          alt="imagen del proyecto"
          className="detail-img"
        />

        <h1 className="detail-title">
          {proyecto.nombre || proyecto.title}
        </h1>

        <p className="detail-line">
          <strong>Descripción:</strong>{' '}
          {proyecto.descripcion || proyecto.description}
        </p>

        <p className="detail-line">
          <strong>Tecnologías:</strong> {proyecto.tecnologias}
        </p>

        {proyecto.link && (
          <p className="detail-line">
            <a
              href={proyecto.link}
              target="_blank"
              rel="noopener noreferrer"
              className="detail-link"
            >
              Ver proyecto ↗
            </a>
          </p>
        )}

        <hr className="detail-hr" />

        {/* ===== INVITAR COLABORADOR ===== */}
        {token && (
          <div className="collab-invite">
            <h3 className="collab-title">Invitar colaborador</h3>

            <div className="collab-row">
              <input
                className="collab-input"
                type="email"
                placeholder="Email del colaborador"
                value={emailInvitar}
                onChange={(e) => setEmailInvitar(e.target.value)}
              />
              <button className="btn btn-primary" onClick={invitarColaborador}>
                Invitar
              </button>
            </div>

            {mensaje && <p className="collab-msg">{mensaje}</p>}
          </div>
        )}

        {/* ===== LISTA DE COLABORADORES ===== */}
        <div className="collab-list-wrapper">
          <h4 className="collab-subtitle">Colaboradores</h4>

          {colaboradores.length > 0 ? (
            <ul className="collab-list">
              {colaboradores.map((email) => (
                <li key={email} className="collab-item">
                  <span className="collab-email">{email}</span>

                  {token && (
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => eliminarColaborador(email)}
                    >
                      Eliminar
                    </button>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="collab-empty">Todavía no hay colaboradores.</p>
          )}
        </div>

        <div className="detail-footer">
          <Link to="/proyectos" className="btn btn-ghost">
            Volver
          </Link>
        </div>
      </div>
    </div>
  )
}

export default DetalleProyecto
