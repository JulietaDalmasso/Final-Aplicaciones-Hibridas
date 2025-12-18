export async function fetchProyectos(token, filtros = {}) {
  const headers = {}
  if (token) headers['Authorization'] = `Bearer ${token}`

  // Construir query params
  const params = new URLSearchParams()

  if (filtros.title) params.append('title', filtros.title)
  if (filtros.tecnologia) params.append('tecnologia', filtros.tecnologia)

  const url = params.toString()
    ? `http://localhost:3333/api/proyectos?${params.toString()}`
    : `http://localhost:3333/api/proyectos`

  const res = await fetch(url, { headers })
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
