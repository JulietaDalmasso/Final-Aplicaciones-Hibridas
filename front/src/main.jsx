import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

import Home from './pages/Home'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Layout from './components/Layout.jsx'
import Proyectos from './pages/Proyectos.jsx'
import DetalleProyecto from './pages/DetalleProyecto.jsx'
import FormularioNuevoProyecto from './pages/FormularioNuevoProyecto.jsx'
import FormularioEditarProyecto from './pages/FormularioEditarProyecto.jsx'
import EliminarProyecto from './pages/EliminarProyecto.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

import { SessionProvider } from './contexts/session.context.jsx'
import NotFound from './pages/NotFound.jsx'


let router = createBrowserRouter([
  {
    path: '/',
    element: (
      <SessionProvider>
        <Layout />
      </SessionProvider>
    ),
    children: [
      { path: '/', element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },

      // públicas
      { path: '/proyectos', element: <Proyectos /> },
      { path: '/proyectos/:id', element: <DetalleProyecto /> },

      // rutas protegidas
      {
        path: '/proyectos/nuevo',
        element: <ProtectedRoute element={<FormularioNuevoProyecto />} />,
      },
      {
        path: '/proyectos/modificar/:id',
        element: <ProtectedRoute element={<FormularioEditarProyecto />} />,
      },
      {
        path: '/proyectos/eliminar/:id',
        element: <ProtectedRoute element={<EliminarProyecto />} />,
      },
    ],
  },
  { path: '/admin', element: <div>PANEL ADMIN</div> },
  { path: '*', element: <NotFound /> },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
