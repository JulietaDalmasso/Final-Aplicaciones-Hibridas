import React, { useState } from 'react'
import { useToken } from '../contexts/session.context'
import { crearProyecto } from '../services/proyectos.service'
import { useNavigate } from 'react-router-dom'

const FormularioNuevoProyecto = () => {
  const [form, setForm] = useState({ title: '', descripcion: '', tecnologias: '', img: '' })
  const [error, setError] = useState(null)
  const token = useToken()
  const navigate = useNavigate()

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setError(null)
    try {
      // Enviar el campo 'title' en vez de 'nombre'
      const payload = {
        title: form.title,
        description: form.descripcion,
        tecnologias: form.tecnologias,
        img: form.img
      }
      const res = await crearProyecto(payload, token)
      if (res._id) {
        navigate('/proyectos')
      } else {
        setError(res.message || 'Error al crear el proyecto')
      }
    } catch (err) {
      setError('Error al crear el proyecto')
    }
  }

  if (!token) {
    return <div style={{ color: 'red', textAlign: 'center', marginTop: '2rem' }}>Debes iniciar sesión para crear un proyecto.</div>
  }
  return (
    <form onSubmit={handleSubmit}>
      <input type='text' name='title' placeholder='Título del Proyecto' value={form.title} onChange={handleChange} />
      <input type='text' name='descripcion' placeholder='Descripción del Proyecto' value={form.descripcion} onChange={handleChange} />
      <input type='text' name='tecnologias' placeholder='Tecnologías Usadas' value={form.tecnologias} onChange={handleChange} />
      <input type='text' name='img' placeholder='URL de la Imagen' value={form.img} onChange={handleChange} />
      <input type='submit' value='Guardar' />
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </form>
  )
}

export default FormularioNuevoProyecto
