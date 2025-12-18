import React from 'react'
import { Link } from 'react-router-dom'
import './NotFound.css'

const NotFound = () => {
  return (
    <div className="notfound-container">
      <div className="notfound-card">
        <h1 className="notfound-title">404</h1>
        <p className="notfound-text">La página que estás buscando no existe.</p>

        <Link to="/" className="notfound-link">
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}

export default NotFound
