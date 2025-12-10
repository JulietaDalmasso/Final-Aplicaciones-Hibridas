import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useToken } from '../contexts/session.context'
import { fetchProyectos, crearProyecto } from '../services/proyectos.service'

const FormularioEditarProyecto = () => {
  const { id } = useParams()
  const [form, setForm] = useState({ nombre: '', descripcion: '', tecnologias: '', img: '' })
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
          nombre: data.nombre || '',
          descripcion: data.descripcion || '',
          tecnologias: data.tecnologias || '',
          img: data.img || ''
        })
      } catch (e) {
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
      // Adaptar payload para cumplir con la validación del backend
      const payload = {
        title: form.nombre,
        description: form.descripcion,
        tecnologias: form.tecnologias,
        img: form.img
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
      setError('Error al editar el proyecto')
    }
  }

  if (!token) {
    return <div style={{ color: 'red', textAlign: 'center', marginTop: '2rem' }}>Debes iniciar sesión para editar un proyecto.</div>
  }
  return (
    <form onSubmit={handleSubmit}>
      <input type='text' name='nombre' placeholder='Nombre del Proyecto' value={form.nombre} onChange={handleChange} />
      <input type='text' name='descripcion' placeholder='Descripcion del Proyecto' value={form.descripcion} onChange={handleChange} />
      <input type='text' name='tecnologias' placeholder='Tecnologias Usadas' value={form.tecnologias} onChange={handleChange} />
      <input type='text' name='img' placeholder='URL de la Imagen' value={form.img} onChange={handleChange} />
      <input type='submit' value='Editar' />
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </form>
  )
}

export default FormularioEditarProyecto
