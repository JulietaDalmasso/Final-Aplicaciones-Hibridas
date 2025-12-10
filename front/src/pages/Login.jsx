import React, { useState } from 'react'
import { useLogin } from '../contexts/session.context'

const Login = () => {
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const [error, setError] = useState(null)

  const login = useLogin()

  const handleLogin = async () => {
    setError(null)
    if (!email || !pass) {
      setError('Debe completar email y contraseña')
      return
    }

    try {
      const res = await fetch('http://localhost:3333/api/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass })
      })

      const data = await res.json()

      if (!res.ok) {
        // data may contain message and errors (array de mensajes de yup)
        if (data && data.errors && Array.isArray(data.errors) && data.errors.length > 0) {
          setError(data.errors.join(' - '))
        } else {
          setError(data.message || 'Error en el login')
        }
        return
      }

      // data expected: { _id, email, age, token }
      const usuario = { _id: data._id, email: data.email, age: data.age }
      login(data.token, usuario)
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
      <form onSubmit={e => { e.preventDefault(); handleLogin(); }} style={{ background: '#222', padding: '2rem', borderRadius: '12px', minWidth: 320, maxWidth: 400, width: '100%', boxShadow: '0 2px 16px #0002', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h2 style={{ color: '#fff', textAlign: 'center', marginBottom: '1rem' }}>Iniciar sesión</h2>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          type="email"
          placeholder='Correo electrónico'
          style={{ padding: '0.75rem', borderRadius: 8, border: 'none', background: '#333', color: '#fff' }}
        />
        <input
          value={pass}
          onChange={e => setPass(e.target.value)}
          type="password"
          placeholder='Contraseña'
          style={{ padding: '0.75rem', borderRadius: 8, border: 'none', background: '#333', color: '#fff' }}
        />
        <button type="submit" style={{ background: '#8884d8', color: '#fff', border: 'none', borderRadius: 8, padding: '0.75rem', fontWeight: 600, cursor: 'pointer' }}>Ingresar</button>
        {error && <div style={{ color: 'red', marginTop: 8, textAlign: 'center' }}>{error}</div>}
      </form>
    </div>
  )
}

export default Login