import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const DetalleProducto = () => {
  const [producto, setProducto] = useState({})
  const params = useParams()
  const id = params.id
  useEffect(() => {
    fetch("http://localhost:3333/api/productos/" + id)
      .then(res => res.json())
      .then(info => setProducto(info))
  }, [id])

  return (
    <div className='max-w-3xl mx-auto p-6'>
      <h1 className='text-3xl font-bold mb-2'>{producto.nombre}</h1>
      <p className='text-xl text-gray-600 mb-6'>{producto.descripcion}</p>

      <div className='space-y-3 mb-6'>
        <p><span className='font-semibold'>Precio: </span>{producto.precio}</p>
      </div>

      <Link className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium" to="/">
        Volver
      </Link>
    </div>
  )
}

export default DetalleProducto
