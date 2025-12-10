import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav className="main-navbar">
      <div className="navbar-title">JULIETA Y MALENA</div>
      <ul className="navbar-links">
        <li><NavLink to="/">Inicio</NavLink></li>
        <li><NavLink to="/proyectos">Proyectos</NavLink></li>
        <li><NavLink to="/login">Login</NavLink></li>
        <li><NavLink to="/register">Registro</NavLink></li>
      </ul>
    </nav>
  )
}

export default NavBar