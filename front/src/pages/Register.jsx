import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registrarUsuario } from '../services/usuarios.service'

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [passConfirm, setPassConfirm] = useState('')
  const [age, setAge] = useState(18)
  const [errors, setErrors] = useState(null)

  const navigate = useNavigate()

  const handleRegister = async () => {
    setErrors(null)
    try {
      const data = await registrarUsuario({ username, email, password: pass, passwordConfirm: passConfirm, age })
      if (data && data.errors && Array.isArray(data.errors) && data.errors.length > 0) {
        setErrors(data.errors)
        return
      }
      if (data && data.message && !data.username) {
        setErrors([data.message])
        return
      }
      // Registro exitoso, redirigir al login
      navigate('/login')
    } catch (e) {
      setErrors(['No se pudo conectar con el servidor'])
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
      <form onSubmit={e => { e.preventDefault(); handleRegister(); }} style={{ background: '#222', padding: '2rem', borderRadius: '12px', minWidth: 320, maxWidth: 400, width: '100%', boxShadow: '0 2px 16px #0002', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h2 style={{ color: '#fff', textAlign: 'center', marginBottom: '1rem' }}>Registro</h2>
        <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Usuario" style={{ padding: '0.75rem', borderRadius: 8, border: 'none', background: '#333', color: '#fff' }} />
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Correo electrónico" type="email" style={{ padding: '0.75rem', borderRadius: 8, border: 'none', background: '#333', color: '#fff' }} />
        <input value={pass} onChange={e => setPass(e.target.value)} placeholder="Contraseña" type="password" style={{ padding: '0.75rem', borderRadius: 8, border: 'none', background: '#333', color: '#fff' }} />
        <input value={passConfirm} onChange={e => setPassConfirm(e.target.value)} placeholder="Confirmar contraseña" type="password" style={{ padding: '0.75rem', borderRadius: 8, border: 'none', background: '#333', color: '#fff' }} />
        <input value={age} onChange={e => setAge(Number(e.target.value))} placeholder="Edad" type="number" min={1} style={{ padding: '0.75rem', borderRadius: 8, border: 'none', background: '#333', color: '#fff' }} />
        <button type="submit" style={{ background: '#8884d8', color: '#fff', border: 'none', borderRadius: 8, padding: '0.75rem', fontWeight: 600, cursor: 'pointer' }}>Registrarse</button>
        {errors && (
          <div style={{ color: 'red', textAlign: 'center' }}>
            {errors.map((err, i) => <div key={i}>{err}</div>)}
          </div>
        )}
      </form>
    </div>
  )
}

export default Register
