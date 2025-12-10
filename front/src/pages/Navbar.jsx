import React from 'react'
import { NavLink } from 'react-router-dom'
import { useToken, useSession } from '../contexts/session.context'

const Navbar = () => {
  const token = useToken()
  const { setToken, setUsuario } = useSession()

  const handleLogout = () => {
    setToken(null)
    setUsuario(null)
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
  }

  return (
    <nav className="proyectos-links" style={{ background: '#111', padding: '20px', display: 'flex', justifyContent: 'flex-end', gap: '20px' }}>
      <NavLink to="/">Inicio</NavLink>
      <NavLink to="/proyectos">Proyectos</NavLink>
      {!token ? (
        <>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Registro</NavLink>
        </>
      ) : (
        <button onClick={handleLogout} style={{ color: '#f1f1f1', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Cerrar sesión</button>
      )}
    </nav>
  )
}

export default Navbar
