
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import NavBar from './components/NavBar';


const App = () => {
  return (
    <>
      <NavBar/>
    </>
  )
}

export default App


/* 

INFO:

el useState es un HOOK (estado), lo que hace es retornar un array con dos valores

    [VALOR1, VALOR2]

el valor1 --> una variable
el valor2 --> una funcion que permite cambiar el valor de esa variable

cuando hago el = useState() --> en los parentesis recibe como quiero que se inicialice la variable 

esto se utiliza para renderizar un valor *cambiante* en pantalla

*/
/* 
const App = () => {
  const [personajes, setPersonajes] = useState([])

  //useEffect recibe una funcion que se va a ejecutar cuando se renderiza el componente por primera vez
  useEffect( () => {
    setPersonajes(JSON.parse(localStorage.getItem('personajes')))

    return () => {

    }
  }, [])


  const handleSubmit = (e) => {
    e.preventDefault()
    setPersonajes([...personajes, 
        {
          id: personajes.length + 1, 
          nombre: e.target.nombre.value, 
          apellido: e.target.apellido.value
        }
      ])
  }

  return(
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name='nombre'/>
        <input type="text" name='apellido'/>
        <button type='submit'>Guardar</button>
      </form>
      {personajes.map(personaje => <p key={personaje.id}>{personaje.nombre}</p>)}
    </div>
  )
}

export default App */