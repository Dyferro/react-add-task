import React from "react";
import { nanoid } from 'nanoid';

function App() {

  //States
  const [tarea, setTarea] = React.useState('');
  const [tareas, setTareas] = React.useState([]);
  const [modoEdicion, setModoEdicion] = React.useState(false);
  const [id, setId] = React.useState('');
  const [error, setError] = React.useState(null);

  const agregarTarea = (e) => {
    e.preventDefault()
    if (!tarea.trim()) {
      console.log('Elemento vacio');
      setError('Escriba la tarea...')
      return
    }
    setTarea('')
    setError(null)
    setTareas([
      ...tareas,
      { id: nanoid(10), nombreTarea: tarea }
    ])
  }

  const eliminarTarea = (id) => {
    const arrFilter = tareas.filter(item => item.id !== id);
    setTareas(arrFilter)
  }

  const editar = item => {
    setModoEdicion(true)
    setTarea(item.nombreTarea)
    setId(item.id)
  }

  const editarTarea = e => {
    e.preventDefault()
    if (!tarea.trim()) {
      console.log('Campo vacio')
      setError('Escriba la tarea...')
      return
    }
    const arrayEditado = tareas.map(item => item.id === id ? { id, nombreTarea: tarea } : item)
    setTareas(arrayEditado)
    setModoEdicion(false)
    setTarea('')
    setId('')
    setError(null)
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center">CRUD Simple</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h3 className="text-center">Lista de Tareas</h3>
          <ul className="list-group">
            {
              tareas.length === 0 ? (
                <li className="list-group-item">No hay tareas</li>
              ) : (
                tareas.map((item) => (
                  <li className="list-group-item" key={item.id}>
                    <span className="lead">Tarea : {item.nombreTarea}</span>
                    <button
                      className="btn btn-danger btn-sm float-right mx-2"
                      onClick={() => eliminarTarea(item.id)}
                    >
                      Eliminar
                    </button>
                    <button
                      className="btn btn-sm btn-warning float-right"
                      onClick={() => editar(item)}
                    >
                      Editar
                    </button>
                  </li>
                ))
              )

            }
          </ul>
        </div>
        <div className="col-4">
          <h3 className="text-center">
            {
              modoEdicion ? 'Editar Tarea' : 'Agregar Tarea'
            }
          </h3>
          <form onSubmit={modoEdicion ? editarTarea : agregarTarea}>
            {
              error ? <span className="text-danger">{error}</span> : null
            }
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Ingrese Tarea"
              onChange={(e) => setTarea(e.target.value)}
              value={tarea}
            />
            {
              modoEdicion ? (
                <button className="btn btn-warning btn-block" type="submit">Editar</button>
              ) : (
                <button className="btn btn-dark btn-block" type="submit">Agregar</button>
              )
            }
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
