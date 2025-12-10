import React from 'react'
import { Navigate } from 'react-router-dom'
import { useToken } from '../contexts/session.context.jsx'

const ProtectedRoute = ({ element }) => {
    const token = useToken()
    if (token) return element

    return <Navigate to="/login" replace />
}

export default ProtectedRoute