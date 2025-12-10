import { createContext, useState, useContext, useEffect } from "react";
import {useNavigate} from 'react-router-dom'

const SessionContext = createContext() //creo contexto

function useSession(){
    return useContext(SessionContext)
}

function useUsuario(){
    const {usuario} = useSession() 
    return usuario
}

function useToken(){
    const {token} = useSession()
    return token
}

function useLogin(){
    const {onLogin} = useSession()
    return onLogin
}

export function SessionProvider({children}){
    const [usuario, setUsuario] = useState(null)
    const [token, setToken ] = useState(localStorage.getItem("token"))

    // Inicializar usuario desde localStorage si existe
    useEffect(() => {
        const raw = localStorage.getItem('usuario')
        if (raw) {
            try {
                setUsuario(JSON.parse(raw))
            } catch (e) {
                setUsuario(raw)
            }
        }
    }, [])

    const navigate = useNavigate()

    const onLogin = (jwt, usuario) => {
        localStorage.setItem("token", jwt)
        try {
            localStorage.setItem("usuario", JSON.stringify(usuario))
        } catch (e) {
            localStorage.setItem("usuario", String(usuario))
        }
        setToken(jwt)
        setUsuario(usuario)
        navigate("/")
    }
    return (
        <SessionContext.Provider value={{usuario, setUsuario, token, setToken, onLogin}}>
            {children}
        </SessionContext.Provider>
    )
}

export {SessionContext, useSession, useUsuario, useToken, useLogin}