import React, { useState } from 'react'
import { useToken } from '../contexts/session.context'
import { crearProyecto } from '../services/proyectos.service'
import { useNavigate } from 'react-router-dom'

const FormularioNuevoProyecto = () => {
  const [form, setForm] = useState({
    title: '',
    descripcion: '',
    tecnologias: '',
    img: '',
    clienteNombre: '',
    clienteEmail: '',
    clienteFoto: '',
    clienteDescripcion: ''
  })

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
      const payload = {
        title: form.title,
        description: form.descripcion,
        tecnologias: form.tecnologias,
        img: form.img,
        clienteNombre: form.clienteNombre,
        clienteEmail: form.clienteEmail,
        clienteFoto: form.clienteFoto,
        clienteDescripcion: form.clienteDescripcion
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
    return (
      <div style={{ color: 'red', textAlign: 'center', marginTop: '2rem' }}>
        Debes iniciar sesión para crear un proyecto.
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="form-proyecto">
      
      <input
        type='text'
        name='title'
        placeholder='Título del Proyecto'
        value={form.title}
        onChange={handleChange}
        required
      />

      <input
        type='text'
        name='descripcion'
        placeholder='Descripción del Proyecto'
        value={form.descripcion}
        onChange={handleChange}
      />

      <input
        type='text'
        name='tecnologias'
        placeholder='Tecnologías Usadas (separadas por coma)'
        value={form.tecnologias}
        onChange={handleChange}
      />

      <input
        type='text'
        name='img'
        placeholder='URL de la Imagen'
        value={form.img}
        onChange={handleChange}
      />

      <hr />

      {/* CLIENTE */}
      <input
        type='text'
        name='clienteNombre'
        placeholder='Nombre del Cliente'
        value={form.clienteNombre}
        onChange={handleChange}
        required
      />

      <input
        type='email'
        name='clienteEmail'
        placeholder='Email del Cliente'
        value={form.clienteEmail}
        onChange={handleChange}
        required
      />

      <input
        type='text'
        name='clienteFoto'
        placeholder='URL de la Foto del Cliente'
        value={form.clienteFoto}
        onChange={handleChange}
        required
      />

      <input
        type='text'
        name='clienteDescripcion'
        placeholder='Descripción del Cliente'
        value={form.clienteDescripcion}
        onChange={handleChange}
        required
      />

      <input type='submit' value='Guardar' />

      {error && <div style={{ color: 'red' }}>{error}</div>}
    </form>
  )
}

export default FormularioNuevoProyecto
