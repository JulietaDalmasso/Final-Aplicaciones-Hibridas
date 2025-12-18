import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useToken } from '../contexts/session.context'

const FormularioEditarProyecto = () => {
  const { id } = useParams()
  const [form, setForm] = useState({
    nombre: '',
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

  useEffect(() => {
    async function cargarProyecto() {
      if (!token) return
      try {
        const res = await fetch(`http://localhost:3333/api/proyectos/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        const data = await res.json()

        setForm({
          nombre: data.title || data.nombre || '',
          descripcion: data.description || data.descripcion || '',
          tecnologias: Array.isArray(data.tecnologias)
            ? data.tecnologias.join(', ')
            : data.tecnologias || '',
          img: data.img || '',
          clienteNombre: data.cliente?.nombre || '',
          clienteEmail: data.cliente?.email || '',
          clienteFoto: data.cliente?.foto || '',
          clienteDescripcion: data.cliente?.descripcion || ''
        })
      } catch (e) {
        console.error(e)
        setError('No se pudo cargar el proyecto')
      }
    }
    cargarProyecto()
  }, [id, token])

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setError(null)
    try {
      const payload = {
        title: form.nombre,
        description: form.descripcion,
        tecnologias: form.tecnologias,
        img: form.img,
        clienteNombre: form.clienteNombre,
        clienteEmail: form.clienteEmail,
        clienteFoto: form.clienteFoto,
        clienteDescripcion: form.clienteDescripcion
      }

      const res = await fetch(`http://localhost:3333/api/proyectos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      })

      const data = await res.json()

      if (data.message === 'Proyecto actualizado') {
        navigate('/proyectos')
      } else {
        setError(data.message || 'Error al editar el proyecto')
      }
    } catch (err) {
      console.error(err)
      setError('Error al editar el proyecto')
    }
  }

  if (!token) {
    return (
      <div style={{ color: 'red', textAlign: 'center', marginTop: '2rem' }}>
        Debes iniciar sesión para editar un proyecto.
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="form-proyecto">

      <input
        type='text'
        name='nombre'
        placeholder='Nombre del Proyecto'
        value={form.nombre}
        onChange={handleChange}
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
        placeholder='Tecnologías Usadas'
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

      <input type='submit' value='Editar' />

      {error && <div style={{ color: 'red' }}>{error}</div>}
    </form>
  )
}

export default FormularioEditarProyecto
