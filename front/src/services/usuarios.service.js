// Servicio frontend: solo consumir la API del backend
// No debe importar ni usar 'bcrypt' ni 'mongodb'.

export async function registrarUsuario(data) {
    const res = await fetch('http://localhost:3333/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return await res.json();
}

export async function loginUsuario(data) {
    const res = await fetch('http://localhost:3333/api/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return await res.json();
}
