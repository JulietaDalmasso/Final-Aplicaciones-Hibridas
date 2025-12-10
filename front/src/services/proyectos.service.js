export async function fetchProyectos(token) {
  const headers = {}
  if (token) headers['Authorization'] = `Bearer ${token}`
  const res = await fetch('http://localhost:3333/api/proyectos', { headers })
  return await res.json()
}

export async function crearProyecto(data, token) {
  const res = await fetch('http://localhost:3333/api/proyectos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })
  return await res.json()
}

